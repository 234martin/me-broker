# backend/app/main.py
from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Optional
import asyncio
import requests
import base64
import stripe
import os

from .database import Base, engine, get_db
from .models import Product

# --------------------
# APP SETUP
# --------------------
app = FastAPI(title="Marketplace API")

# --------------------
# CORS
# --------------------
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# DATABASE
# --------------------
Base.metadata.create_all(bind=engine)

# --------------------
# STRIPE CONFIG
# --------------------
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "your_stripe_key_here")

# --------------------
# PAYPAL CONFIG
# --------------------
PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID", "your_paypal_client_id")
PAYPAL_SECRET = os.getenv("PAYPAL_SECRET", "your_paypal_secret")

# --------------------
# MPESA CONFIG
# --------------------
MPESA_CONSUMER_KEY = os.getenv("MPESA_KEY", "your_mpesa_key")
MPESA_CONSUMER_SECRET = os.getenv("MPESA_SECRET", "your_mpesa_secret")
MPESA_SHORTCODE = os.getenv("MPESA_SHORTCODE", "your_shortcode")
MPESA_PASSKEY = os.getenv("MPESA_PASSKEY", "your_passkey")
MPESA_ENV = "sandbox"  # or "production"

# --------------------
# SCHEMAS
# --------------------
class ProductCreate(BaseModel):
    name: str
    price: float
    image: Optional[str] = None
    category: str
    description: Optional[str] = None
    seller_id: int

class ProductOut(ProductCreate):
    id: int

class PaymentRequest(BaseModel):
    amount: float
    currency: str = "usd"
    description: Optional[str] = "Marketplace Payment"
    phone: Optional[str] = None

class PurchaseRequest(BaseModel):
    amount: float
    currency: str = "usd"
    method: str  # stripe, paypal, mpesa, bank
    description: Optional[str] = "Marketplace Payment"
    phone: Optional[str] = None

# --------------------
# WEBSOCKET MANAGER
# --------------------
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                disconnected.append(connection)
        for conn in disconnected:
            self.disconnect(conn)

manager = ConnectionManager()

# --------------------
# PRODUCTS ENDPOINTS
# --------------------
@app.get("/products", response_model=List[ProductOut])
def get_products(
    category: Optional[str] = Query(None, description="Filter by category (case-insensitive)"),
    seller_id: Optional[int] = Query(None, description="Filter by seller id"),
    db: Session = Depends(get_db),
):
    q = db.query(Product)
    if category:
        q = q.filter(Product.category.ilike(f"%{category}%"))
    if seller_id is not None:
        q = q.filter(Product.seller_id == seller_id)
    return q.all()

@app.post("/products", response_model=ProductOut, status_code=201)
async def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    product = Product(**payload.dict())
    db.add(product)
    db.commit()
    db.refresh(product)

    # Broadcast new product via WebSocket
    await manager.broadcast({
        "action": "new_product",
        "product": product.__dict__
    })
    return product

@app.put("/products/{product_id}", response_model=ProductOut)
async def update_product(product_id: int, payload: ProductCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in payload.dict().items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)

    # Broadcast updated product via WebSocket
    await manager.broadcast({
        "action": "update_product",
        "product": product.__dict__
    })
    return product

@app.delete("/products/{product_id}", response_model=dict)
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()

    # Broadcast deleted product via WebSocket
    await manager.broadcast({
        "action": "delete_product",
        "product_id": product_id
    })
    return {"message": "Product deleted successfully"}

# --------------------
# WEBSOCKET
# --------------------
@app.websocket("/ws/products")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            try:
                await websocket.send_json({"action": "ping"})
                await asyncio.sleep(10)
            except WebSocketDisconnect:
                manager.disconnect(websocket)
                break
            except Exception:
                manager.disconnect(websocket)
                break
    except Exception:
        manager.disconnect(websocket)

# --------------------
# PAYMENT HELPERS
# --------------------
def get_paypal_access_token():
    try:
        auth = base64.b64encode(f"{PAYPAL_CLIENT_ID}:{PAYPAL_SECRET}".encode()).decode()
        headers = {"Authorization": f"Basic {auth}"}
        res = requests.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            headers=headers,
            data={"grant_type": "client_credentials"},
            timeout=10
        )
        res.raise_for_status()
        return res.json().get("access_token")
    except Exception as e:
        print("PayPal token error:", e)
        return None

def get_mpesa_token():
    try:
        res = requests.get(
            f"https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            auth=(MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET),
            timeout=10
        )
        res.raise_for_status()
        return res.json().get("access_token")
    except Exception as e:
        print("Mpesa token error:", e)
        return None

# --------------------
# UNIFIED PURCHASE ENDPOINT
# --------------------
@app.post("/purchase")
async def purchase(req: PurchaseRequest):
    try:
        method = req.method.lower()

        # ---------------- STRIPE ----------------
        if method == "stripe":
            try:
                intent = stripe.PaymentIntent.create(
                    amount=int(req.amount * 100),
                    currency=req.currency,
                    automatic_payment_methods={"enabled": True},
                    description=req.description,
                )
                return {"provider": "stripe", "client_secret": intent.client_secret}
            except stripe.error.StripeError as e:
                raise HTTPException(status_code=400, detail=f"Stripe error: {str(e)}")

        # ---------------- PAYPAL ----------------
        if method == "paypal":
            token = get_paypal_access_token()
            if not token:
                raise HTTPException(status_code=500, detail="Failed to get PayPal access token")
            headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
            order_payload = {
                "intent": "CAPTURE",
                "purchase_units": [{"amount": {"currency_code": req.currency.upper(), "value": f"{req.amount:.2f}"}}]
            }
            try:
                res = requests.post(
                    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
                    headers=headers,
                    json=order_payload,
                    timeout=10
                )
                res.raise_for_status()
                return {"provider": "paypal", "order": res.json()}
            except requests.RequestException as e:
                raise HTTPException(status_code=500, detail=f"PayPal API error: {str(e)}")

        # ---------------- MPESA ----------------
        if method == "mpesa":
            if not req.phone:
                raise HTTPException(status_code=400, detail="Phone number required for M-Pesa")
            token = get_mpesa_token()
            if not token:
                raise HTTPException(status_code=500, detail="Failed to get M-Pesa token")
            payload = {
                "BusinessShortCode": MPESA_SHORTCODE,
                "Password": MPESA_PASSKEY,
                "Timestamp": "20251202123456",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": req.amount,
                "PartyA": req.phone,
                "PartyB": MPESA_SHORTCODE,
                "PhoneNumber": req.phone,
                "CallBackURL": "https://yourdomain.com/mpesa/callback",
                "AccountReference": "Marketplace",
                "TransactionDesc": "Payment for order"
            }
            try:
                res = requests.post(
                    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                    headers={"Authorization": f"Bearer {token}"},
                    json=payload,
                    timeout=10
                )
                res.raise_for_status()
                return {"provider": "mpesa", "response": res.json()}
            except requests.RequestException as e:
                raise HTTPException(status_code=500, detail=f"M-Pesa API error: {str(e)}")

        # ---------------- BANK ----------------
        if method == "bank":
            return {
                "provider": "bank",
                "status": "pending",
                "message": f"Bank transfer of {req.amount} {req.currency} initiated"
            }

        raise HTTPException(status_code=400, detail="Invalid payment method")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected server error: {str(e)}")

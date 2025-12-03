# Broker-Free Marketplace — Backend (FastAPI) Starter

This is a minimal FastAPI backend scaffold focused on the "wallet + manual payouts" flow (Option D).

Features included:
- User registration (creates wallet)
- Product creation & listing
- Order creation with commission calculation
- Wallet balance for sellers
- Payout request (manual processing by admin)

How to run (locally):
1. Create a virtualenv and install requirements:
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt

2. Run the app:
   uvicorn app.main:app --reload --port 8000

Notes & next steps:
- Replace SECRET_KEY and use proper auth (OAuth2PasswordBearer).
- Implement platform wallet tracking for commissions.
- Add admin endpoints to process payouts (transfer to bank/mobile money).
- Secure endpoints and add tests.

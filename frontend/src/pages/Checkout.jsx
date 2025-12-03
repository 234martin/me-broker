// frontend/src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        </div>
      </main>
    );
  }

  const handlePayment = async () => {
    setLoading(true);

    const payload = {
      amount: totalPrice,
      currency: "usd",
      method: paymentMethod,
      description: "Marketplace Payment",
      ...(paymentMethod === "mpesa" ? { phone: mpesaPhone } : {}),
    };

    try {
      console.log("Sending to backend:", payload);
      const res = await axios.post("http://127.0.0.1:8000/purchase", payload);

      if (paymentMethod === "stripe") {
        alert(`Stripe client secret: ${res.data.client_secret}`);
        // Here you can integrate Stripe Elements/Checkout
      } else if (paymentMethod === "paypal") {
        alert(`PayPal order created: ${JSON.stringify(res.data.order)}`);
        // Here you can redirect to PayPal checkout
      } else if (paymentMethod === "mpesa") {
        alert(`M-Pesa response: ${JSON.stringify(res.data.response)}`);
      } else if (paymentMethod === "bank") {
        alert(res.data.message);
      }

      clearCart();
      navigate("/");

    } catch (err) {
      console.error("Payment error:", err.response ? err.response.data : err);
      alert("Payment failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg text-white flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Cart Summary */}
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="flex flex-col gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
            />
            Stripe
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            PayPal
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="mpesa"
              checked={paymentMethod === "mpesa"}
              onChange={() => setPaymentMethod("mpesa")}
            />
            M-Pesa
          </label>
          {paymentMethod === "mpesa" && (
            <input
              type="tel"
              placeholder="Enter phone number"
              value={mpesaPhone}
              onChange={(e) => setMpesaPhone(e.target.value)}
              className="mt-2 p-2 rounded text-black"
            />
          )}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => setPaymentMethod("bank")}
            />
            Bank Transfer
          </label>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
          disabled={loading || (paymentMethod === "mpesa" && !mpesaPhone)}
        >
          {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </main>
  );
}

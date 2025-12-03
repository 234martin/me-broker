// frontend/src/pages/Checkout.jsx

import React from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded"
            >
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>
                  {item.qty} x ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Remove
                </button>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={clearCart}
            className="mt-4 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

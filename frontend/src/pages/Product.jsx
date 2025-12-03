// frontend/src/pages/Product.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useSellerProducts } from "../context/SellerProductsContext";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const { products } = useSellerProducts();
  const { addToCart } = useCart();

  // Find the product
  const product = products.find((p) => p.id.toString() === id.toString());

  if (!product) {
    return (
      <main className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 bg-gray-800 p-6 rounded-xl shadow-lg">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center items-center bg-black rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title || product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-white">{product.title || product.name}</h1>
          <p className="text-gray-300 text-lg">{product.description}</p>
          <p className="text-green-400 font-bold text-2xl">
            ${product.price?.toFixed(2)}
          </p>

          <p className="text-gray-400">
            Category: {product.category || "Uncategorized"}
          </p>

          <button
            onClick={() => addToCart(product, 1)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold w-full transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

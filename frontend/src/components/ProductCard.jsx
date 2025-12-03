// frontend/src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, isSellerView = false, onDelete }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition transform hover:-translate-y-1">
      {/* Product Image */}
      <div className="w-full h-48 bg-black overflow-hidden">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title || product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-white font-semibold text-lg line-clamp-1">
          {product.title || product.name}
        </h4>

        <p className="text-gray-300 text-sm line-clamp-2 mt-1">
          {product.description || "No description available"}
        </p>

        {/* Category & Seller */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span className="bg-blue-600 px-2 py-1 rounded">{product.category}</span>
          {product.seller || product.seller_id ? (
            <span>Seller: {product.seller || product.seller_id}</span>
          ) : null}
        </div>

        <p className="text-green-400 font-bold text-lg mt-3">
          ${product.price?.toFixed(2)}
        </p>

        {!isSellerView ? (
          <button
            onClick={() => addToCart(product, 1)}
            className="mt-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full transition-colors duration-200"
          >
            Add to Cart
          </button>
        ) : onDelete ? (
          <button
            onClick={() => onDelete(product.id)}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Remove Product
          </button>
        ) : null}
      </div>
    </div>
  );
}

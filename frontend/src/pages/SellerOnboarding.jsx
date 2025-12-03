import React from "react";
import { useSellerProducts } from "../context/SellerProductsContext";
import { Link } from "react-router-dom";

export default function SellerDashboard() {
  const { sellerProducts } = useSellerProducts();

  return (
    <div className="text-white max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link to="/seller/create-product" className="px-4 py-2 bg-green-600 rounded">
          Add Product
        </Link>
      </div>

      {sellerProducts.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {sellerProducts.map((prod) => (
            <div key={prod.id} className="bg-gray-800 rounded shadow p-4">
              <img src={prod.image} className="h-40 w-full object-cover rounded" />
              <h2 className="text-xl font-bold mt-3">{prod.name}</h2>
              <p className="text-gray-300">${prod.price}</p>
              <p className="text-gray-400 text-sm">{prod.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

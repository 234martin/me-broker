// src/pages/SellerProducts.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SellerProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/products", {
        params: { seller_id: user.id },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Products</h1>
        <Link
          to="/seller/create-product"
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-xl font-semibold transition-colors shadow-md"
        >
          Add New Product
        </Link>
      </div>

      {loading ? (
        <p className="text-white text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-white text-center">No products yet. Add some!</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col justify-between"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-cyan-400 font-bold mb-2">${product.price}</p>
              <p className="text-gray-300 mb-4">{product.category}</p>
              <div className="flex justify-between gap-2">
                <Link
                  to={`/seller/edit-product/${product.id}`}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-xl font-semibold text-center transition-colors shadow"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

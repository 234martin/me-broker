// src/pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Toys",
  "Beauty",
  "Automotive",
  "Books",
  "Groceries",
];

export default function EditProduct() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://127.0.0.1:8000/products?seller_id=${user.id}`);
      const prod = res.data.find((p) => p.id === Number(id));
      if (!prod) {
        setError("Product not found.");
        return;
      }
      setProduct(prod);
    } catch (err) {
      console.error(err);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://127.0.0.1:8000/products/${id}`, product);
      navigate("/seller-products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white text-center text-xl mt-12">Loading product...</p>;
  if (error) return <p className="text-red-500 text-center text-xl mt-12">{error}</p>;
  if (!product) return null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col gap-6"
      >
        <div>
          <label className="block text-white font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-1">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}

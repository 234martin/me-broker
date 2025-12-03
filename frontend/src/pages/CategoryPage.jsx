// frontend/src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ALL_CATEGORIES = [
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

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products by category
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      const filtered = data.filter(
        (p) => p.category.toLowerCase() === categoryName.toLowerCase()
      );
      setProducts(filtered);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  return (
    <main className="bg-gray-900 min-h-screen pt-32 px-6">
      {/* Page header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-white">{categoryName}</h1>
        <div className="flex flex-wrap gap-3">
          {ALL_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className={`px-5 py-2 rounded-xl font-semibold shadow-lg transition transform hover:-translate-y-1
                ${
                  cat === categoryName
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-white hover:bg-blue-600"
                }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-80 rounded-xl bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-white text-center text-xl mt-12">
          No products found in this category.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

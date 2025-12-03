import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

export default function SellerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch seller products
  const fetchSellerProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      // Only show products belonging to the logged-in seller
      setProducts(data.filter(p => p.seller_id === user.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProducts();

    // ---------------- WebSocket ----------------
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/products");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.action === "new_product") {
        const p = message.product;
        if (p.seller_id === user.id) {
          setProducts(prev => [...prev, p]);
        }
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, [user.id]);

  return (
    <main className="bg-gray-900 min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-white mb-8">
        My Products
      </h1>

      {loading ? (
        <p className="text-white text-center text-xl">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-white text-center text-xl">
          You haven't added any products yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

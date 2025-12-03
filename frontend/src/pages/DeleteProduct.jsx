import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const found = storedProducts.find((p) => p.id === id);
    setProduct(found);
  }, [id]);

  const handleDelete = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updated = storedProducts.filter((p) => p.id !== id);

    localStorage.setItem("products", JSON.stringify(updated));

    alert("Product deleted successfully.");
    navigate("/seller-dashboard");
  };

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-700">Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Product</h2>

      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-bold mt-2">Ksh {product.price}</p>

        {product.image && (
          <img
            src={product.image}
            alt="product"
            className="w-full h-48 object-cover rounded mt-4"
          />
        )}

        <p className="mt-4 text-red-600 font-semibold">
          Are you sure you want to delete this product?
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Yes, Delete
          </button>

          <button
            onClick={() => navigate("/seller-dashboard")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

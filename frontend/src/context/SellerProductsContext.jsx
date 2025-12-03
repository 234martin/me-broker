// frontend/src/context/SellerProductsContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const SellerProductsContext = createContext();

export function SellerProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("market_products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save products to localStorage on change
  useEffect(() => {
    localStorage.setItem("market_products", JSON.stringify(products));

    // Dispatch event for live updates
    window.dispatchEvent(new Event("seller_products_updated"));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <SellerProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </SellerProductsContext.Provider>
  );
}

export function useSellerProducts() {
  return useContext(SellerProductsContext);
}

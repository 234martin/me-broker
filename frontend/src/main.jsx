import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
       <BrowserRouter>
        <App />
       </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);

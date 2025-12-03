import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import SellerDashboard from "./pages/SellerDashboard";
import SellerOnboarding from "./pages/SellerOnboarding";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage"; // <-- new full categories listing page
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import SellerProducts from "./pages/SellerProducts";
import Checkout from "./pages/Checkout";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { SellerProductsProvider } from "./context/SellerProductsContext";

export default function App() {
  return (
    <AuthProvider>
      <SellerProductsProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-gray-900 text-white">

            {/* HEADER */}
            <Header />

            {/* MAIN ROUTING */}
            <main className="flex-grow container mx-auto px-4 py-6">
              <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<Product />} />

                {/* NEW: FULL CATEGORIES PAGE */}
                <Route path="/categories" element={<CategoriesPage />} />

                {/* PUBLIC CATEGORY PAGE */}
                <Route path="/category/:categoryName" element={<CategoryPage />} />

                {/* PUBLIC SELLER PRODUCTS PAGE */}
                <Route path="/seller-products" element={<SellerProducts />} />

                {/* DELETE PRODUCT PAGE (also public for now) */}
                <Route path="/delete-product/:id" element={<DeleteProduct />} />

                {/* BUYER ROUTES */}
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute type="buyer">
                      <Cart />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute type="buyer">
                      <Checkout />
                    </PrivateRoute>
                  }
                />

                {/* SELLER ROUTES */}
                <Route
                  path="/seller"
                  element={
                    <PrivateRoute type="seller">
                      <SellerDashboard />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/seller/onboard"
                  element={
                    <PrivateRoute type="seller">
                      <SellerOnboarding />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/seller/create-product"
                  element={
                    <PrivateRoute type="seller">
                      <CreateProduct />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/seller/edit-product/:id"
                  element={
                    <PrivateRoute type="seller">
                      <EditProduct />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/seller/delete-product/:id"
                  element={
                    <PrivateRoute type="seller">
                      <DeleteProduct />
                    </PrivateRoute>
                  }
                />

                {/* NEW: SELLER ANALYTICS DASHBOARD */}
                <Route
                  path="/seller/analytics"
                  element={
                    <PrivateRoute type="seller">
                      <AnalyticsDashboard />
                    </PrivateRoute>
                  }
                />

              </Routes>
            </main>

            {/* FOOTER */}
            <Footer />
          </div>
        </CartProvider>
      </SellerProductsProvider>
    </AuthProvider>
  );
}

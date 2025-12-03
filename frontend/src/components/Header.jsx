// frontend/src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative text-gray-200 font-medium hover:text-white transition-colors
        after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
        after:w-0 after:h-[2px] after:bg-white after:rounded-full
        hover:after:w-full after:transition-all after:duration-300"
    >
      {children}
    </Link>
  );

  return (
    <header className="
      fixed top-0 left-0 w-full z-50
      bg-white/5 backdrop-blur-xl
      shadow-[0_0_25px_rgba(0,0,0,0.3)]
      border-b border-white/10
    ">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-5">
        
        {/* Brand Logo */}
        <div className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text">
          MarketPlace
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 text-lg">

          {/* NOT LOGGED IN */}
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          {/* BUYER NAVIGATION */}
          {user && user.type === "buyer" && (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/categories">Categories</NavLink> {/* Updated */}
              <NavLink to="/cart">Cart</NavLink>

              <button
                onClick={logout}
                className="
                  bg-red-500/80 px-4 py-2 rounded-lg text-white
                  hover:bg-red-600 transition-all
                  shadow-md hover:shadow-red-500/30
                "
              >
                Logout
              </button>
            </>
          )}

          {/* SELLER NAVIGATION */}
          {user && user.type === "seller" && (
            <>
              <NavLink to="/seller">Dashboard</NavLink>
              <NavLink to="/seller/create-product">Add Product</NavLink>

              <button
                onClick={logout}
                className="
                  bg-red-500/80 px-4 py-2 rounded-lg text-white
                  hover:bg-red-600 transition-all
                  shadow-md hover:shadow-red-500/30
                "
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

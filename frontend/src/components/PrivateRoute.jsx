import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * type: "buyer" | "seller"
 * Protects routes so only authenticated users of the correct type can access them
 */
export default function PrivateRoute({ children, type }) {
  const { user } = useAuth();

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (type && user.type !== type) {
    // Logged in but wrong type → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage if present
  useEffect(() => {
    const savedUser = localStorage.getItem("marketplaceUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    // Simple demo: match user in localStorage
    const savedUsers = JSON.parse(localStorage.getItem("marketplaceUsers") || "[]");
    const found = savedUsers.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem("marketplaceUser", JSON.stringify(found));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const register = (name, email, password, type) => {
    const savedUsers = JSON.parse(localStorage.getItem("marketplaceUsers") || "[]");
    if (savedUsers.find(u => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }
    const newUser = { id: Date.now(), name, email, password, type };
    savedUsers.push(newUser);
    localStorage.setItem("marketplaceUsers", JSON.stringify(savedUsers));
    setUser(newUser);
    localStorage.setItem("marketplaceUser", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("marketplaceUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      setError("");
      navigate("/"); // redirect to home
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-bold"
        >
          Login
        </button>
        <p className="text-gray-400 mt-4 text-center">
          Don’t have an account? <Link className="text-indigo-400" to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

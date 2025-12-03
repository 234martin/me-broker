import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("buyer"); // buyer or seller
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const res = register(name, email, password, type);
    if (res.success) {
      setError("");
      navigate("/"); // redirect after register
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
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <select
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-bold"
        >
          Register
        </button>
        <p className="text-gray-400 mt-4 text-center">
          Already have an account? <Link className="text-indigo-400" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

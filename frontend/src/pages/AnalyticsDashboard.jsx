import React from "react";
import { useSellerProducts } from "../context/SellerProductsContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AnalyticsDashboard() {
  const { products } = useSellerProducts();

  // Dummy sales data (you will replace this later with real API stats)
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 17000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 20000 },
    { month: "May", sales: 25000 },
    { month: "Jun", sales: 23000 },
  ];

  // Generate category summary from current seller products
  const categoryStats = Object.values(
    products.reduce((acc, product) => {
      const category = product.category || "Other";
      if (!acc[category]) acc[category] = { category, count: 0 };
      acc[category].count += 1;
      return acc;
    }, {})
  );

  // Revenue Pie Summary
  const revenueData = [
    { name: "Completed Orders", value: 54000 },
    { name: "Pending Orders", value: 12000 },
    { name: "Cancelled", value: 4000 },
  ];

  const COLORS = ["#4ade80", "#60a5fa", "#f87171"];

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{products.length}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm">Monthly Sales</h3>
          <p className="text-3xl font-bold mt-2">Ksh 25,000</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-gray-400 text-sm">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">Ksh 74,000</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Line Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip contentStyle={{ background: "#222", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Top Product Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="category" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip contentStyle={{ background: "#222", borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Revenue Breakdown</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#222", borderRadius: 8 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

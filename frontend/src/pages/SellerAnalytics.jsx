// frontend/src/pages/SellerAnalytics.jsx
import React from "react";
import { useSellerProducts } from "../context/SellerProductsContext";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function SellerAnalytics() {
  const { products } = useSellerProducts();

  // Fake analytics (until API exists)
  const totalViews = products.reduce((sum, p) => sum + (p.views || 120), 0);
  const totalClicks = products.reduce((sum, p) => sum + (p.clicks || 35), 0);
  const totalSales = products.reduce((sum, p) => sum + (p.sales || 8), 0);
  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.sales || 8) * (p.price || 0),
    0
  );

  const topProducts = [...products]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 5);

  // Chart data
  const salesChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales",
        data: [2, 4, 3, 6, 8, 7, 5],
        borderWidth: 2,
        borderColor: "#4ADE80",
        tension: 0.3,
      },
    ],
  };

  const viewsChartData = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Views",
        data: products.map((p) => p.views || 120),
        backgroundColor: "#6366F1",
      },
    ],
  };

  return (
    <div className="text-white bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Analytics Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-400">Total Views</h3>
          <p className="text-3xl font-bold mt-2">{totalViews}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-400">Total Clicks</h3>
          <p className="text-3xl font-bold mt-2">{totalClicks}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-400">Total Sales</h3>
          <p className="text-3xl font-bold mt-2">{totalSales}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-400">Revenue</h3>
          <p className="text-3xl font-bold mt-2">Ksh {totalRevenue}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Weekly Sales Line Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Weekly Sales Overview</h2>
          <Line data={salesChartData} />
        </div>

        {/* Product Views Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Product Views</h2>
          <Bar data={viewsChartData} />
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Top Performing Products</h2>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          {topProducts.length === 0 ? (
            <p className="text-gray-400">No products available.</p>
          ) : (
            <ul className="space-y-4">
              {topProducts.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Sales: {p.sales || 8}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Views: {p.views || 120}
                    </p>
                  </div>
                  <span className="text-green-400 font-bold text-xl">
                    Ksh {(p.sales || 8) * (p.price || 0)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

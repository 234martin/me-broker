// frontend/src/pages/CategoriesPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", img: "/cat-electronics.jpg" },
  { name: "Fashion", img: "/cat-fashion.jpg" },
  { name: "Home & Garden", img: "/cat-home.jpg" },
  { name: "Sports", img: "/cat-sports.jpg" },
  { name: "Toys", img: "/cat-toys.jpg" },
  { name: "Beauty", img: "/cat-beauty.jpg" },
  { name: "Automotive", img: "/cat-automotive.jpg" },
  { name: "Books", img: "/cat-books.jpg" },
  { name: "Groceries", img: "/cat-groceries.jpg" },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-center">
          Explore Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name}`}
              className="group relative rounded-3xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-[1.03]"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500"></div>
              </div>

              {/* Category info */}
              <div className="relative z-10 p-6 flex flex-col justify-end h-56">
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2">
                  {cat.name}
                </span>
                <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
                <p className="text-gray-300 text-sm mt-1">
                  Explore top products in {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

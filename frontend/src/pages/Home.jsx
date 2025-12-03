import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSellerProducts } from "../context/SellerProductsContext";
import ProductCard from "../components/ProductCard";

// -----------------------------------------------------------------------------
// Home.jsx — Modern Marketplace Homepage
// -----------------------------------------------------------------------------
export default function Home() {
  const { products } = useSellerProducts();

  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Featured & trending selections
  const featuredProducts = products.slice(0, 8);
  const trendingProducts = products.slice(0, 10);

  // Static categories
  const categories = [
    { name: "Electronics", img: "/cat-electronics.jpg" },
    { name: "Fashion", img: "/cat-fashion.jpg" },
    { name: "Home & Garden", img: "/cat-home.jpg" },
  ];

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Live search suggestions
  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();

    return products
      .filter((p) => (p.name || p.title || "").toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, products]);

  // Auto-scrolling carousel
  const carouselRef = useRef(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let raf;
    let pos = 0;
    const speed = 0.5;

    const step = () => {
      pos = (pos + speed) % (el.scrollWidth || 1);
      el.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trendingProducts.length]);

  // Skeleton loading mock
  useEffect(() => {
    setLoading(products.length === 0);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [products.length]);

  // Page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.35 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="home"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className={`min-h-screen bg-gradient-to-b ${
          theme === "dark"
            ? "from-gray-900 to-gray-950"
            : "from-white to-gray-50"
        }`}
      >

        {/* -------------------------------------------------------------------
          NAVBAR (Glassmorphism)
        ------------------------------------------------------------------- */}
        
        {/* -------------------------------------------------------------------
          HERO SECTION + Animated Blobs
        ------------------------------------------------------------------- */}
        <section className="relative pt-28">
          {/* Left Blob */}
          <motion.div
            className="absolute -left-32 -top-20 w-96 h-96 rounded-full bg-purple-600 opacity-40 blur-3xl"
            animate={{
              x: [0, 150, -80, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.08, 0.98, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Right Blob */}
          <motion.div
            className="absolute -right-32 top-12 w-[28rem] h-[28rem] rounded-full bg-blue-500 opacity-40 blur-3xl"
            animate={{
              x: [0, -120, 60, 0],
              y: [0, 60, -40, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Shop Smarter. Live Better.
              </h1>

              <p className="mt-6 text-gray-300 text-lg max-w-xl">
                Explore high-quality products from sellers around the world. Smooth shopping, secure checkout, and beautiful UI.
              </p>

              <div className="mt-8 flex gap-4 items-center">
                <Link to="/category/Electronics" className="inline-block bg-green-600 hover:bg-green-500 px-6 py-3 rounded-2xl font-semibold shadow">Shop Electronics</Link>
                <Link to="/register" className="inline-block text-sm text-gray-300 hover:text-white">Become a Seller →</Link>
              </div>

              {/* Benefits */}
              <div className="mt-8 flex gap-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="bg-white/5 rounded-full w-10 h-10 flex items-center justify-center">⚡</div>
                  <div>
                    <div className="text-sm font-semibold">Fast Shipping</div>
                    <div className="text-xs text-gray-400">Reliable couriers</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white/5 rounded-full w-10 h-10 flex items-center justify-center">🔒</div>
                  <div>
                    <div className="text-sm font-semibold">Secure Payments</div>
                    <div className="text-xs text-gray-400">Stripe & PayPal</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-white/5 to-white/3 p-2 rounded-3xl shadow-2xl">
                <img src="/hero-image.png" alt="hero" className="rounded-3xl w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
          TRENDING CAROUSEL
        ------------------------------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link to="/trending" className="text-sm text-gray-400 hover:text-white">See all</Link>
          </div>

          <div ref={carouselRef} className="flex gap-6 overflow-x-auto no-scrollbar py-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="min-w-[260px] bg-gray-800 rounded-2xl p-4 animate-pulse h-64" />
                ))
              : trendingProducts.map((p) => (
                  <div key={p.id} className="min-w-[260px] max-w-[260px]">
                    <ProductCard product={p} />
                  </div>
                ))
            }
          </div>
        </section>

        {/* -------------------------------------------------------------------
          CATEGORY GRID
        ------------------------------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-3xl font-bold mb-6">Shop by Category</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={`/category/${c.name}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 shadow-lg hover:scale-[1.02] transition-transform"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform"
                />

                <div className="relative z-10 p-6 flex flex-col items-start gap-4">
                  <div className="bg-white/5 px-3 py-1 rounded-full text-sm">{c.name}</div>
                  <div className="text-2xl font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-400">Explore top picks in {c.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------------
          FEATURED PRODUCTS
        ------------------------------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/featured" className="text-sm text-gray-400 hover:text-white">
              Browse all
            </Link>
          </div>

          {loading
            ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-xl bg-gray-800 animate-pulse" />
                ))}
              </div>
            )
            : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuredProducts.map((p) => (
                  <motion.div key={p.id} whileHover={{ scale: 1.03 }} className="transition-transform">
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            )
          }
        </section>

        {/* -------------------------------------------------------------------
          CTA: Become a Seller
        ------------------------------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-800 p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-4xl font-bold mb-3">Start Selling Today</h3>
              <p className="text-gray-200 max-w-xl">
                Create your seller account and reach thousands of customers. We handle payments and logistics so you can focus on growth.
              </p>
            </div>

            <Link
              to="/register"
              className="bg-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-500"
            >
              Become a Seller
            </Link>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-24" />
      </motion.main>
    </AnimatePresence>
  );
}

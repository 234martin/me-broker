import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="py-28 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-white"
        >
          About Our Marketplace
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-200 text-lg max-w-2xl mx-auto"
        >
          A trusted global platform where anyone can buy and sell anything safely.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            To empower millions of buyers and sellers by providing a secure,
            modern, and user-friendly digital marketplace where quality meets trust.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            To become the world’s leading marketplace through innovation, integrity,
            and unmatched customer experience.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            { num: "1M+", label: "Active Users" },
            { num: "500K+", label: "Products Listed" },
            { num: "120+", label: "Countries Supported" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 bg-gray-900 rounded-2xl shadow-xl"
            >
              <h3 className="text-5xl font-extrabold text-white">{stat.num}</h3>
              <p className="mt-3 text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

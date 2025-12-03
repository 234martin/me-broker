import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Secure Payments",
    desc: "Fast, reliable and protected checkout ensuring safe transactions.",
    icon: "💳"
  },
  {
    title: "Verified Sellers",
    desc: "We verify all sellers to maintain a trustworthy shopping environment.",
    icon: "🛡️"
  },
  {
    title: "Fast Delivery",
    desc: "Global shipping support with real-time delivery tracking.",
    icon: "📦"
  },
  {
    title: "24/7 Support",
    desc: "Dedicated customer care team available anytime.",
    icon: "💬"
  }
];

export default function Services() {
  return (
    <main className="bg-gray-900 text-gray-200">
      {/* Hero */}
      <section className="py-28 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-white"
        >
          Our Services
        </motion.h1>
        <p className="mt-4 text-gray-300 text-lg">
          We offer everything you need for a smooth online marketplace experience.
        </p>
      </section>

      {/* Service Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold text-white">{service.title}</h3>
            <p className="text-gray-300 mt-3">{service.desc}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}

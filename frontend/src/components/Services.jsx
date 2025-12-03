import React from "react";

const services = [
  { id: 1, title: "Premium Design", description: "Beautiful, responsive designs that elevate your brand." },
  { id: 2, title: "Fast Performance", description: "Optimized code for lightning-fast websites and apps." },
  { id: 3, title: "Global Support", description: "24/7 expert assistance for all your needs." },
];

export default function Services() {
  return (
    <section className="grid md:grid-cols-3 gap-8 p-12">
      {services.map((service) => (
        <div key={service.id} className="bg-primary p-6 rounded-xl shadow-xl hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold text-secondary">{service.title}</h3>
          <p className="mt-2 text-accent">{service.description}</p>
        </div>
      ))}
    </section>
  );
}

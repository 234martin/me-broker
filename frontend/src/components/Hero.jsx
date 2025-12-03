import React from "react";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <h1 className="text-6xl font-bold text-white drop-shadow-lg">Elevate Your Experience</h1>
      <p className="mt-4 text-xl text-gray-200">World-class solutions for your business</p>
      <button className="mt-8 px-8 py-4 bg-secondary text-primary font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
        Get Started
      </button>
    </section>
  );
}

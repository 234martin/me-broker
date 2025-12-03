import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary p-8 mt-12 text-center text-accent">
      <p>&copy; 2025 BrandName. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="hover:text-secondary transition-colors">Twitter</a>
        <a href="#" className="hover:text-secondary transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-secondary transition-colors">Instagram</a>
      </div>
    </footer>
  );
}

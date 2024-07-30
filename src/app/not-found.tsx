"use client";
import React from "react";
import Link from "next/link";
import "./globals.css";
const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
      <Link href="/" className="px-6 py-3 bg-[#20B486] text-white rounded-lg hover:bg-{#41e0ae} transition-colors">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
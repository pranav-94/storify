import React from "react";
import Link from "next/link";
import Header from "@/components/ui/Header";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-900 h-screen">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <main className="relative flex-grow flex items-center justify-center">
        <div className="absolute inset-0 " />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 lg:px-8 lg:py-16 text-center">
          <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent">
            AI-driven Tool For Story Generation 
          </h1>
          <p className="mx-auto mt-6 max-w-md sm:max-w-lg lg:max-w-2xl text-sm sm:text-lg leading-6 sm:leading-8 text-gray-400">
            Our Story genrator genarates a high quality stories , with story poster template works on all devices, so you only have to set it up once, and get beautiful
            results forever.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button className="bg-violet-600 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-violet-700 flex items-center">
             Sign
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="border border-gray-700 text-gray-300 px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-gray-800 hover:text-white">
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
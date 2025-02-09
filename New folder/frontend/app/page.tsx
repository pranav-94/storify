import React from "react";
import Header from "@/components/ui/Header";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-screen bg-[#0B0D13] bg-gradient-to-br from-[#0B0D13] to-[#131627] flex flex-col">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <main className="relative flex-grow flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,50,168,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16 text-center">
          <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
            AI-driven tools for product teams
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, atque praesentium? Ea obcaecati consequuntur dolores reiciendis rerum accusantium aspernatur repellendus.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button className="bg-violet-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-violet-700 flex items-center">
              Start Building
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="border border-gray-700 text-gray-300 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 hover:text-white">
              Schedule Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// // import React from "react";
// // import Link from "next/link";
// // import Header from "@/components/ui/Header";

// // export default function LandingPage() {
// //   return (
// //     <div className="bg-gradient-to-r from-gray-600 to-gray-900 h-screen">
// //       {/* Navigation */}
// //       <Header />

// //       {/* Hero Section */}
// //       <main className="relative flex-grow flex items-center justify-center">
// //         <div className="absolute inset-0 " />
// //         <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 lg:px-8 lg:py-16 text-center">
// //           <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent">
// //             AI-driven Tool For Story Generation 
// //           </h1>
// //           <p className="mx-auto mt-6 max-w-md sm:max-w-lg lg:max-w-2xl text-sm sm:text-lg leading-6 sm:leading-8 text-gray-400">
// //             Our Story genrator genarates a high quality stories , with story poster template works on all devices, so you only have to set it up once, and get beautiful
// //             results forever.
// //           </p>
// //           <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
// //             <button className="bg-violet-600 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-violet-700 flex items-center">
// //              Sign
// //               <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //               </svg>
// //             </button>
// //             <button className="border border-gray-700 text-gray-300 px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-gray-800 hover:text-white">
// //               Login
// //             </button>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }









"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 brightness-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 "></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-20">
      {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8 + Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 z-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-blue-200 px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Storytelling</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform Your Ideas Into
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Captivating Stories
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Our AI-powered platform turns your concepts into rich, engaging narratives in seconds. Experience the future
            of storytelling today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
            href={"/signup"}
            >
            <Button size="lg" className="group">
              Sign Up
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            </Link>
            <Link
            href={"/signin"}
            >
            <Button variant="outline" size="lg">
              Login
            </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating UI elements */}
        <motion.div
          className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        {/* <motion.div
          className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
          }}
        /> */}
      </div>
    </div>
  )
}

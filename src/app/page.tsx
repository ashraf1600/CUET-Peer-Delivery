"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { motion, AnimatePresence } from "framer-motion";
import coverImg from "../../public/images/coverImg.jpg";

export default function Home() {
  const [showServices, setShowServices] = useState(false);

  const services = [
    "📦 Same Day Parcel Pickup & Delivery (CUET ↔ City)",
    "🏠 Main Gate-to-Hall & Residential Areas Delivery",
    "🍱 Instant Food, Snacks & Groceries Delivery",
    "📄 Document & Assignment Delivery Across CUET",
    "💊 Emergency Medicine Delivery from City",
    "🎁 Event Items & Club Materials Transportation",
    "🛍 Instant Delivery from Gate to Anywhere in CUET",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Fixed Background Image Layer */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full">
        <Image
          src={coverImg}
          alt="Background"
          fill
          className="h-full w-full object-cover"
        />
        <div className="bg-opacity-60 absolute inset-0" />
      </div>
      {/* Foreground Content */}
      <Container>
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg md:text-6xl">
            CUET PEER Delivery
          </h1>
          <p className="mt-6 text-xl font-medium text-amber-300 italic drop-shadow-md md:text-2xl">
            Fast. Reliable. Delivered with CUET Spirit.
          </p>
          <div className="mt-10">
            <button
              onClick={() => setShowServices(!showServices)}
              className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-600"
            >
              {showServices ? "Hide Services" : "Explore Services"}
            </button>
          </div>

          {/* Services Section */}
          <AnimatePresence>
            {showServices && (
              <motion.div
                className="bg-opacity-10 mt-10 w-full max-w-xl rounded-lg p-6 shadow-xl backdrop-blur-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="mb-4 text-3xl font-bold text-amber-300">
                  Our Services
                </h2>

                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 text-left text-lg"
                >
                  {services.map((service, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="border-l-4 border-amber-400 pl-4 text-white"
                    >
                      {service}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
        
    </main>
  );
}

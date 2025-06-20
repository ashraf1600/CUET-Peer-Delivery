"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Container } from "@/components/shared/Container";
import { motion, AnimatePresence } from "framer-motion";
import coverImg from "../../public/images/LPP.png";

export default function Home() {
  const [showServices, setShowServices] = useState(false);
  const [index, setIndex] = useState(0);

  const taglines = [
    "Fast. Reliable. Delivered with CUET Spirit. 🚀",
    "Empowering Peer-to-Peer Logistics Inside CUET.",
    "From Gate to Hall — We've Got You Covered!",
  ];

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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col text-blue-700 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 -z-10 w-screen h-screen bg-gradient-to-r from-[#eaf4ff] via-white to-[#eaf4ff]">
        <Image
          src={coverImg}
          alt="CUET background"
          fill
          className="object-contain sm:object-cover object-center brightness-75"
          priority
        />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <Container>
        <div className="z-10 grid min-h-screen items-center">
          <div className="max-w-2xl pl-2 pr-10 md:pl-4 lg:pl-8 xl:pl-12">
            {/* Title */}
            <motion.h1
              className="text-6xl font-black tracking-tight text-stone-900 drop-shadow-lg md:text-7xl"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CUET Peer Delivery
            </motion.h1>

            {/* Tagline */}
            <AnimatePresence mode="wait">
              <motion.p
                key={taglines[index]}
                className="mt-4 max-w-xl text-xl md:text-2xl font-extrabold italic text-amber-700 drop-shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                {taglines[index]}
              </motion.p>
            </AnimatePresence>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => setShowServices(!showServices)}
                className="rounded-xl bg-blue-700 px-8 py-3 text-white text-lg font-bold shadow-xl hover:bg-blue-800 transition-all"
              >
                {showServices ? "Hide Services" : "Explore Services"}
              </button>

              {/* Users Count */}
              <motion.p
                className="mt-4 text-base font-bold text-blue-900 drop-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                🚚 Trusted by{" "}
                <span className="text-amber-700 font-extrabold">452+</span> CUET users
              </motion.p>
            </motion.div>

            {/* Services List */}
            <AnimatePresence>
              {showServices && (
                <motion.div
                  className="mt-12 w-full rounded-2xl border border-blue-300 bg-white/40 p-6 shadow-2xl backdrop-blur-md"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h2
                    className="mb-6 text-4xl font-extrabold text-blue-800 drop-shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Services We Provide
                  </motion.h2>

                  <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4 text-left text-blue-900"
                  >
                    {services.map((service, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="border-l-4 border-blue-500 pl-4 text-lg font-semibold"
                      >
                        {service}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </main>
  );
}

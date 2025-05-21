"use client";

import Navbar from "@/components/CustomComponents/Navbar/Navbar";
import { Poppins } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <main className={`mx-auto min-h-screen ${poppins.className}`}>
        {children}
      </main>
    </>
  );
}

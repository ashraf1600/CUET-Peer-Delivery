import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-blue-900 text-gray-300 py-10">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-white">CUET PEER DELIVERY</h2>
          <p className="mt-2 text-sm">
            Providing reliable delivery since 2025. Built with CUET spirit 💛
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Services</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-white transition">Branding</li>
            <li className="hover:text-white transition">Design</li>
            <li className="hover:text-white transition">Marketing</li>
            <li className="hover:text-white transition">Advertisement</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Company</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-white transition">
              <Link href="/about">About us</Link>
            </li>
            <li className="hover:text-white transition">Contact</li>
            <li className="hover:text-white transition">Jobs</li>
            <li className="hover:text-white transition">Press kit</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-white transition">Terms of use</li>
            <li className="hover:text-white transition">Privacy policy</li>
            <li className="hover:text-white transition">Cookie policy</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-blue-800 pt-6 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} CUET PEER Delivery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

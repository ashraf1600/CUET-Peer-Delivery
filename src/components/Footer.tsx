import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer with Different Color */}
      <footer className="mt-auto bg-slate-800 py-10 text-gray-300">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
          {/* Branding */}
          <div>
            <h2 className="text-xl font-bold text-white">CUET PEER DELIVERY</h2>
            <p className="mt-2 text-sm">
              Providing reliable delivery since 2025. Built with CUET spirit 💛
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-1 text-sm">
              <li>Branding</li>
              <li>Design</li>
              <li>Marketing</li>
              <li>Advertisement</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-1 text-sm">
              <Link href="/about">
                <li>About us</li>
              </Link>
              <li>Contact</li>
              <li>Jobs</li>
              <li>Press kit</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-1 text-sm">
              <li>Terms of use</li>
              <li>Privacy policy</li>
              <li>Cookie policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CUET PEER Delivery. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;

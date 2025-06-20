import React from "react";
import { Container } from "@/components/shared/Container";
import Image from "next/image";

const Page: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2e2a2a] via-[#f9fafb] to-[#001f3f] px-6 py-20">
      <Container>
        <section className="flex flex-col items-center justify-between gap-14 lg:flex-row">
          {/* Left Text Section */}
          <div className="max-w-xl">
            <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-gray-900">
              CUET Peer Delivery
            </h1>
            <p className="text-black-700 mt-5 text-lg leading-relaxed font-semibold">
              Empowering students to deliver, share, and support each other
              across the CUET campus — with trust, speed, and community spirit.
            </p>
            <p className="mt-4 text-lg text-amber-800 italic">
              “Fast. Reliable. Delivered with CUET Spirit.” 🚀
            </p>

            <ul className="mt-6 space-y-3 text-base leading-relaxed text-gray-800">
              <li>
                🚀 <strong className="text-sky-700">Fast Delivery:</strong>{" "}
                Every request fulfilled by trusted CUET peers.
              </li>
              <li>
                🔒 <strong className="text-sky-700">Verified Network:</strong>{" "}
                Only CUET-authenticated users participate.
              </li>
              <li>
                📱{" "}
                <strong className="text-sky-700">Intuitive Experience:</strong>{" "}
                Seamless interface with instant updates.
              </li>
            </ul>

            <div className="mt-8">
              <button className="rounded-xl bg-indigo-700 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-indigo-800">
                Start a Delivery
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full max-w-lg">
            <Image
              src="/images/peer_delivery.jpg"
              alt="CUET Delivery Illustration"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-24 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium">CUET PEER Delivery</span>. Built with ❤
          by CUETians, for CUETians.
        </footer>
      </Container>
    </main>
  );
};

export default Page;

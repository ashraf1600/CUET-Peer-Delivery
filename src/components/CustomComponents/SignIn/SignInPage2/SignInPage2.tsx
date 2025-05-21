"use client";

import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";
// import LoginForm from "./components/LoginForm"
import Link from "next/link";
import LoginForm from "./LoginForm";
import { usePhoneStore } from "@/store/usePhoneStore";
import ResetPassword from "./ResetPassword";

export default function SignInPage2() {
  const { resetPassword } = usePhoneStore();
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Pink background */}
      <div className="flex w-full flex-col bg-gradient-to-b from-[#ffe6e6] to-[#ffb3b3] p-6 md:w-1/2 md:p-10">
        <div className="flex justify-start">{/* <LanguageSelector /> */}</div>

        <div className="flex flex-grow flex-col items-center justify-center gap-8">
          <div className="flex w-fit items-center gap-2 rounded-full bg-[#e9d1d1] px-6 py-2">
            <Phone className="text-black" size={20} />
            <span className="font-medium text-black">09678 911 911</span>
          </div>

          <div className="max-w-md text-center">
            <p className="text-lg text-black">
              The Largest Ambulance Network and Booking Platform in Bangladesh.
              Providing 24/7 Ambulance Service.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-md border border-red-500 px-6 py-3 text-red-500 transition-colors hover:bg-red-50"
          >
            <ArrowLeft size={18} />
            <Link href="/">
              <span>Back to Home</span>
            </Link>
          </Link>
        </div>

        <div className="mt-auto"></div>
      </div>
      {resetPassword ? (
        <>
          {/* Right side - White background */}
          <div className="flex w-full flex-col bg-white p-6 md:w-1/2 md:p-10">
            <div className="mb-10 flex justify-center">
              <div className="relative h-12 w-40">
                <Image
                  src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740"
                  alt="AmbuFast Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-grow flex-col items-center justify-center">
              <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Forgot Your Password?
                  </h1>
                  <p className="text-gray-600">
                    Don&apos;t worry! We&apos;ll help you reset it in a few easy
                    steps
                  </p>
                </div>

                {/* <LoginForm /> */}
                <ResetPassword />

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    You have an account?
                    <Link href="/#" className="ml-1 font-medium text-red-500">
                      Login Now
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 text-center text-sm text-gray-500">
              <p>
                © 2024 - AmbuFast a brand of SafeCare 24/7 Medical Services
                limited
              </p>
              <div className="mt-2 flex justify-center gap-4">
                <Link href="/#" className="hover:text-gray-700">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/#" className="hover:text-gray-700">
                  FAQs
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Right side - White background */}
          <div className="flex w-full flex-col bg-white p-6 md:w-1/2 md:p-10">
            <div className="mb-10 flex justify-center">
              <div className="relative h-20 w-40">
                <Image
                  src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740"
                  alt="Starter Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-grow flex-col items-center justify-center">
              <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Welcome Back to Starter
                  </h1>
                  <p className="text-gray-600">Login into your account</p>
                </div>

                <LoginForm />

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don&apos;t have an account?
                    <Link href="/#" className="ml-1 font-medium text-red-500">
                      Register Now
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 text-center text-sm text-gray-500">
              <p>
                © 2024 - Starter a brand of SafeCare 24/7 Medical Services
                limited
              </p>
              <div className="mt-2 flex justify-center gap-4">
                <Link href="/#" className="hover:text-gray-700">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/#" className="hover:text-gray-700">
                  FAQs
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

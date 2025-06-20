"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/post",
      });
      if (result?.error) {
        setError(result.error);
      } else {
        window.location.href = "/post";
      }
    } catch (err) {
      console.error("SignIn error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-900 to-gray-100">
      {/* Left side with promotional content */}
      <div className="hidden w-1/2 items-center justify-center lg:flex">
        <div className="text-white p-10">
          <div className="text-4xl font-bold mb-4">Welcome to CUET Peer Delivery!</div>
          <p className="text-lg mb-8">
            Join our community and Bridg the distances at CUET — Get your essentials delivered by peers, faster than ever!
          </p>
         
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">CUET Peer Delivery</h1>
          <h2 className="text-xl font-semibold mb-2 text-center">Welcome Back!</h2>
          <p className="mb-6 text-center">Don't have an account? <Link href="/auth/register" className="text-blue-500">Sign up</Link>. It's easy! Takes less than a minute.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <div className="mb-4 text-sm text-red-600 text-center">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login Now"}
            </Button>
            <div className="mt-4 text-center">
              <Link href="#" className="text-sm text-blue-500">Forgot password? Click here</Link>
            </div>
          </form>
          <div className="mt-4 flex justify-center">
            <button className="flex items-center justify-center w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img src="/images/google_logo.webp" alt="Google Logo" className="h-4 w-4 mr-2" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

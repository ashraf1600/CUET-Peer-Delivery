"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import leftImg from "../../../../../public/images/login-img.jpg";
import logoImg from "../../../../../public/images/logo (2).png";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { post } from "@/lib/api/handlers";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [stdId, setStdId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hallName, setHallName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await post("/api/auth/register", {
        stdId,
        name,
        email,
        hallName,
        password,
        description,
        role,
      });

      if (!response) {
        throw new Error("Registration failed");
      }

      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-900 to-gray-100">
      {/* Left side with promotional content */}
      <div className="hidden w-1/2 items-center justify-center lg:flex">
        <div className="text-white p-10 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src={logoImg}
              alt="CUET Peer Delivery Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="text-4xl font-bold mb-4">Welcome to CUET Peer Delivery!</div>
          <p className="text-lg mb-8">
            Join our community to enhance your academic experience. Connect with peers and access resources to help you succeed!
          </p>
        </div>
      </div>

      {/* Right side with registration form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white bg-opacity-90">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={logoImg}
                alt="CUET Peer Delivery Logo"
                width={80}
                height={80}
              />
            </div>
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-2 text-sm text-red-600 text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="stdId">Student ID</Label>
                <Input
                  id="stdId"
                  type="text"
                  placeholder="2104096"
                  value={stdId}
                  onChange={(e) => setStdId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="u2104096@student.cuet.ac.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hallName">Hall Name</Label>
                <select
                  id="hallName"
                  value={hallName}
                  onChange={(e) => setHallName(e.target.value)}
                  className="w-full rounded border p-2"
                  required
                >
                  <option value="" disabled>Select your hall</option>
                  <option value="Dr. QK Hall">Dr. QK Hall</option>
                  <option value="Kabi kazi Nazrul Islam Hall">Kabi kazi Nazrul Islam Hall</option>
                  <option value="Shaheed Tareq Huda Hall">Shaheed Tareq Huda Hall</option>
                  <option value="Shahid Mohammad Shah Hall">Shahid Mohammad Shah Hall</option>
                  <option value="Shaheed Abu Sayed Hall">Shaheed Abu Sayed Hall</option>
                  <option value="Sufia Kamal Hall">Sufia Kamal Hall</option>
                  <option value="Begum Shamsun Nahar khan Hall">Begum Shamsun Nahar khan Hall</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">User Type</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded border p-2"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="mr-3 -ml-1 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </Button>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

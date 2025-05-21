"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import toast from "react-hot-toast";

// Schema with confirm password
const signupSchema = z.object({
  // name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // confirmPassword: z.string().min(6, "Confirm your password"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// 🔒 Password Strength Checker Function
const getPasswordStrength = (password: string): string => {
  if (!password) return "";
  const strong =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
  const medium = /(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}/;
  if (strong.test(password)) return "Strong";
  if (medium.test(password)) return "Medium";
  return "Weak";
};

interface SignupFormProps {
  onSubmit?: (data: { email: string; password: string }) => Promise<void>;
}

export default function SignInForm1({
  onSubmit,
  bgColor,
}: SignupFormProps & { bgColor: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const passwordStrength = getPasswordStrength(password);

  interface SignupFormData {
    email: string;
    password: string;
  }

  const submitHandler = async (data: SignupFormData): Promise<void> => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div
      className={`w-full max-w-sm space-y-4 rounded-lg p-6 shadow-md ${bgColor}`}
    >
      <div className="mb-4 flex flex-col items-center justify-center">
        <img
          src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740"
          alt="Logo"
          className="h-20 w-20 rounded-full border-2 border-blue-500"
        />
        <h1 className="text-2xl font-semibold">Welcome to Starter Temp</h1>
        <p>Login into your account</p>
      </div>
      {/* <h1 className="text-2xl font-semibold">Welcome to Starter Temp</h1>
<p>Register into your account</p> */}

      <form
        onSubmit={handleSubmit(submitHandler)}
        className={`max-w-sm space-y-4`}
      >
        <h2 className="text-center font-sans text-xl">Sign In</h2>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-4 right-2 text-sm text-gray-500"
          >
            {showPassword ? (
              <IoIosEyeOff className="h-5 w-5" />
            ) : (
              <IoIosEye className="h-5 w-5" />
            )}
          </button>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
          {password && (
            <p
              className={`mt-1 text-xs font-medium ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
          )}
        </div>

        {/* <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-3 right-2 text-sm text-gray-500"
          >
            {showConfirm ? (
              <IoIosEyeOff className="h-5 w-5" />
            ) : (
              <IoIosEye className="h-5 w-5" />
            )}
          </button>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div> */}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded bg-blue-600 py-2 text-white transition duration-200 hover:bg-blue-700"
        >
          {isSubmitting ? "Login..." : "Login"}
        </Button>
      </form>

      <p>
        Dont have an account?
        <span
          className="cursor-pointer text-blue-500"
          onClick={() => toast.success("comming soon!")}
        >
          Register Now
        </span>
      </p>
    </div>
  );
}

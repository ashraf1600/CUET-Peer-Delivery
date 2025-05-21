"use client";

import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";
import Link from "next/link";
// import LoginForm from "../login/components/LoginForm";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePhoneStore } from "@/store/usePhoneStore";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/api/handlers";
import { Response } from "@/types/Response";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Zod schema for OTP validation
const otpSchema = z.object({
  otp1: z.string().min(1, "Required"),
  otp2: z.string().min(1, "Required"),
  otp3: z.string().min(1, "Required"),
  otp4: z.string().min(1, "Required"),
  otp5: z.string().min(1, "Required"),
  otp6: z.string().min(1, "Required"),
});

type OtpFields = z.infer<typeof otpSchema>;

type MatchOtpHandler = {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
  error: string | null;
};

export default function RegistrationVerify() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<OtpFields>({
    resolver: zodResolver(otpSchema),
  });
  const { phoneNumber, setOtp } = usePhoneStore();
  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input initially
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (/^[0-9]$/.test(value)) {
      setValue(`otp${index + 1}` as keyof OtpFields, value); // Sync value to form state
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      event.target.value = ""; // Clear non-numeric input
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (!inputRefs.current[index]?.value) {
        setValue(`otp${index}` as keyof OtpFields, ""); // Clear value of previous field
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  const mutate = useMutation({
    mutationFn: async (otp: string) => {
      try {
        const response = await post<Response<MatchOtpHandler>>(
          `/notification/sms/verify--`,
          {
            phoneNumber: phoneNumber,
            otp: otp,
          },
        );
        if (response.success) {
          setOtp(otp);
          return response;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error?.response?.data?.error || "An unexpected error occurred",
          );
        } else {
          throw new Error("Something went wrong");
        }
        // console.log("error",)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("OTP Matched");
      //   handleTabSwitch("confirmPassword");
      router.push("/profile-details--");
    },
  });

  const onSubmit: SubmitHandler<OtpFields> = async (data) => {
    const otp = Object.values(data).join("");
    const formData = new FormData();
    formData.append("otp", otp);
    const response = mutate.mutate(otp);
    // console.log("respone", response)
  };
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
                Verify Your Account
              </h1>
              <p className="text-gray-600">
                We’ve sent a one-time password (OTP) to your phone{" "}
                {`${phoneNumber}`}. Please enter the code below to complete
                verification.
                <Link href="/#">
                  <span className="text-primary-500">Change Phone Number</span>
                </Link>
              </p>
            </div>

            <form
              className="mt-6 flex flex-col items-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-2">
                {[...Array(6)].map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className={`h-12 w-12 rounded-md border border-gray-300 text-center text-xl focus:ring-2 ${
                      errors[`otp${index + 1}` as keyof OtpFields]
                        ? "focus:ring-red-500"
                        : "focus:ring-primary-500"
                    }`}
                    {...register(`otp${index + 1}` as keyof OtpFields)}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    onChange={(e) => handleInput(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>
              {Object.values(errors).length > 0 && (
                <p className="mt-2 text-sm text-red-500">OTP is not correct</p>
              )}
              <Button
                disabled={mutate.isPending}
                type="submit"
                className="w-full bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {mutate.isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-auto pt-8 text-center text-sm text-gray-500">
          <p>
            © 2024 - Starter a brand of SafeCare 24/7 Medical Services limited
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
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
import { z } from "zod";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Country, getCountryCallingCode } from "react-phone-number-input";
import { FaRegPaperPlane } from "react-icons/fa6";
import CountrySelect from "@/components/shared/CountrySelect";
import en from "react-phone-number-input/locale/en";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/api/handlers";
import { usePhoneStore } from "@/store/usePhoneStore";
// import { Response } from "@/types/Response";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Response } from "@/types/Response";

// Schema
const schema = z
  .object({
    ext: z.string(),
    phone: z.string().min(4, "Phone number must be at least 4 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormField = z.infer<typeof schema>;

type SubmitOtpHandler = {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
  error: string | null;
};

export default function SignupForm2() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      ext: "+1",
      phone: "",
    },
  });

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [country, setCountry] = useState<string | undefined>(undefined);
  const { setPhoneNumber, setPassword, setOtp } = usePhoneStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await post<Response<SubmitOtpHandler>>(
        `/notification/sms/otp--`,
        { phoneNumber },
      );
      return response;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("OTP sent to your phone number");
      router.push("/registration-verify");
    },
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const formattedPhone = data.phone.startsWith("0")
        ? data.phone
        : "0" + data.phone;
      // console.log("formatted", formattedPhone)
      setPhoneNumber(formattedPhone);
      setPassword(data.password);
      mutate(formattedPhone);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Tabs defaultValue="phone" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-2">
        <TabsTrigger
          value="phone"
          className="bg-white data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:shadow-none"
        >
          Register Via Phone
        </TabsTrigger>
        <TabsTrigger
          value="email"
          className="data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:shadow-none"
        >
          Register Via Email
        </TabsTrigger>
      </TabsList>

      {/* PHONE TAB */}
      <TabsContent value="phone">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <input type="hidden" {...register("ext")} />

          <div className="space-y-2">
            <label className="font-medium">Phone Number</label>
            <div className="flex gap-2">
              <div className="w-2/5">
                <CountrySelect
                  labels={en}
                  value={country}
                  onChange={(value) => {
                    setCountry(value);
                    setValue(
                      "ext",
                      value
                        ? `+${getCountryCallingCode(value as Country)}`
                        : "+1",
                    );
                  }}
                  className="border-input bg-background h-12 w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>
              <div className="w-2/3">
                <Input
                  {...register("phone")}
                  className="h-12"
                  disabled={!country}
                  placeholder="Enter Phone Number"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-primary-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="resetPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="pr-10"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-primary-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => {
              setOtp("true");
            }}
            className="hover:bg-colors-secondary-hover mt-4 flex h-12 w-full items-center justify-center gap-x-2 bg-red-500 text-lg leading-[27px] font-semibold text-white"
          >
            {isPending ? "Sending..." : "Send OTP"}
            <FaRegPaperPlane size={16} />
          </Button>
        </form>
      </TabsContent>

      {/* EMAIL TAB (optional, currently static) */}
      <TabsContent value="email">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled
            className="w-full bg-red-500 text-white hover:bg-red-600"
          >
            {isPending ? "Sending..." : "Coming Soon"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}

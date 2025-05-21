"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { z } from "zod";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Country, getCountryCallingCode } from "react-phone-number-input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa6";
import CountrySelect from "@/components/shared/CountrySelect";
import en from "react-phone-number-input/locale/en";
// import { loginHandler } from "@/components/HeroSection/auth/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePhoneStore } from "@/store/usePhoneStore";

const loginSchema = z.object({
  ext: z.string(),
  phone: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormFields = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    setValue,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      ext: "+880", // Default country code
      phone: "",
      password: "",
    },
  });
  const { setResetPassword } = usePhoneStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [country, setCountry] = useState<string | undefined>("BD"); // Set default country

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    setServerError(null);

    const formattedPhone =
      data.ext === "+880" && data.phone.startsWith("0")
        ? data.phone
        : "0" + data.phone;

    const formData = new FormData();
    formData.append("phoneNumber", formattedPhone);
    formData.append("password", data.password);

    const loadingToast = toast.loading("Logging in...");

    // try {
    //   const result = await loginHandler(formData);
    //   toast.dismiss(loadingToast);
    //   if (!result?.error) {
    //     toast.success("Login successful!");
    //     window.location.href = "/";
    //   } else {
    //     toast.error(`Login failed: ${result?.error}`);
    //     setServerError(result?.error);
    //   }
    // } catch (error) {
    //   toast.dismiss(loadingToast);
    //   toast.error("An unexpected error occurred. Please try again.");
    //   setServerError("An unexpected error occurred. Please try again.");
    // }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email login logic here
    // console.log("Email login:", email);
  };

  return (
    <Tabs defaultValue="phone" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-2">
        <TabsTrigger
          value="phone"
          className="bg-white data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:shadow-none"
        >
          Login Via Phone
        </TabsTrigger>
        <TabsTrigger
          value="email"
          className="data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:shadow-none"
        >
          Login Via Email
        </TabsTrigger>
      </TabsList>

      <TabsContent value="phone">
        <form
          onSubmit={handleSubmitLogin(onSubmit)}
          className="flex flex-col gap-y-6"
        >
          <input type="hidden" {...registerLogin("ext")} />

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
                  {...registerLogin("phone")}
                  className="h-12"
                  disabled={!country}
                  placeholder="Enter Phone Number"
                />
                {loginErrors.phone && (
                  <p className="text-sm text-red-500">
                    {loginErrors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label
              className="text-base leading-[100%] font-normal"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                required
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="focus-visible:ring-colors-light-bg h-12 w-full border-0 bg-gray-100 pr-10"
                {...registerLogin("password")}
              />
              {loginErrors.password && (
                <span className="text-sm text-red-500">
                  {loginErrors.password.message}
                </span>
              )}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          <div className="text-end">
            <p className="">
              <Link
                href=""
                onClick={() => setResetPassword(true)}
                className="ml-1 font-medium text-red-500"
              >
                Recover Password
              </Link>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoginSubmitting}
            className="hover:bg-colors-secondary-hover mt-4 flex h-12 w-full items-center justify-center gap-x-2 bg-red-500 text-lg leading-[27px] font-semibold text-white"
          >
            {isLoginSubmitting ? "Logging in..." : "Login"}
            <FaRegPaperPlane size={16} />
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="email">
        <form onSubmit={handleEmailLogin} className="space-y-4">
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

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="email-password">Password</Label>
            </div>
            <Input
              id="email-password"
              type="password"
              placeholder="Password"
              disabled
            />
            <div className="flex justify-end">
              <Link
                href=""
                onClick={() => setResetPassword(true)}
                className="text-sm text-red-500"
              >
                Recover Password
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled
            className="w-full bg-red-500 text-white hover:bg-red-600"
          >
            {isLoginSubmitting ? "Logging in..." : "Coming Soon"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}

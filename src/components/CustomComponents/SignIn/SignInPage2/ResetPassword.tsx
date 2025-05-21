"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { Response } from "@/types/Response";

// Schema
const schema = z.object({
  ext: z.string(),
  phone: z.string().min(4, "Phone number must be at least 4 characters."),
});

interface FormField extends z.infer<typeof schema> {}

type SubmitOtpHandler = {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
  error: string | null;
};

export default function ResetPassword() {
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
  const [deliveryMethod, setDeliveryMethod] = useState("sms");
  const [country, setCountry] = useState<string | undefined>(undefined);
  const { setPhoneNumber } = usePhoneStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const formattedPhone = phoneNumber.startsWith("0")
        ? phoneNumber
        : "0" + phoneNumber;

      const response = await post<Response<SubmitOtpHandler>>(
        `/notification/sms/otp`,
        { phoneNumber: formattedPhone },
      );
      return response;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("OTP sent to your phone number");
      router.push("/verify-otp");
    },
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      setPhoneNumber(data.phone);
      mutate(data.phone);
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
          Phone
        </TabsTrigger>
        <TabsTrigger
          value="email"
          className="data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:shadow-none"
        >
          Email
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

          <Button
            type="submit"
            disabled={isPending}
            className="hover:bg-colors-secondary-hover bg-primary-500 mt-4 flex h-12 w-full items-center justify-center gap-x-2 text-lg leading-[27px] font-semibold text-white"
          >
            {isPending ? "Sending..." : "Send OTP"}
            <FaRegPaperPlane size={16} />
          </Button>

          {/* <Dialog>
            <DialogTrigger asChild>
              <Button
                className="hover:bg-colors-secondary-hover mt-4 flex h-12 w-full items-center justify-center gap-x-2 bg-primary-500 text-lg font-semibold leading-[27px] text-white"
              >
                Send OTP
                <FaRegPaperPlane size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delivery Method (Select Option)</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="py-4">
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-4">
            <div className="flex items-center hover:bg-muted/50">
              <RadioGroupItem value="sms" id="sms" className="data-[state=checked]:bg-primary-500 data-[state=checked]:text-primary-100 data-[state=checked]:border-primary-500"/>
              <Label htmlFor="sms" className="flex-1 px-2 cursor-pointer font-medium">
                SMS
              </Label>
            </div>
            <div className="flex items-center hover:bg-muted/50">
              <RadioGroupItem disabled value="whatsapp" id="whatsapp" />
              <Label htmlFor="whatsapp" className="flex-1 px-2 cursor-pointer font-medium">
                WhatsApp
              </Label>
            </div>
          </RadioGroup>
        </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="hover:bg-colors-secondary-hover mt-4 flex h-12 w-full items-center justify-center gap-x-2 bg-primary-500 text-lg font-semibold leading-[27px] text-white"
                >
                  {isPending ? "Sending..." : "Send OTP"}
                  <FaRegPaperPlane size={16} />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
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
            className="hover:bg-colors-secondary-hover bg-primary-500 mt-4 flex h-12 w-full items-center justify-center gap-x-2 text-lg leading-[27px] font-semibold text-white"
          >
            {isPending ? "Sending..." : "Send OTP"}
            <FaRegPaperPlane size={16} />
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}

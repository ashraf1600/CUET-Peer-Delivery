import { create } from "zustand";

// Define the PhoneState interface
interface PhoneState {
  phoneNumber: string;
  password: string;
  otp: string;
  secret: number;
  setPhoneNumber: (phone: string) => void;
  setSecret: (phone: number) => void;
  clearPhoneNumber: () => void;
  setOtp: (password: string) => void;
  setPassword: (password: string) => void;
  clearPassword: () => void;
  clearOtp: () => void;
  userAvailable: boolean;
  setUserAvailable: () => void;
  resetPassword: boolean;
  setResetPassword: (tab: Boolean) => void;
}

// Create the Zustand store
export const usePhoneStore = create<PhoneState>((set) => ({
  // Initial state
  phoneNumber: "",
  password: "",
  otp: "",
  secret: 0,
  userAvailable: false,
  resetPassword: false,

  // Actions for phone number
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  clearPhoneNumber: () => set({ phoneNumber: "" }),

  // Actions for secret
  setSecret: (secret) => set({ secret }),
  clearSecret: () => set({ secret: 0 }),

  // Actions for password
  setPassword: (password) => set({ password }),
  clearPassword: () => set({ password: "" }),

  // Actions for otp
  setOtp: (otp) => set({ otp }),
  clearOtp: () => set({ otp: "" }),

  setUserAvailable: () => set({ userAvailable: true }),
  setResetPassword: () => set({ resetPassword: true }),
}));

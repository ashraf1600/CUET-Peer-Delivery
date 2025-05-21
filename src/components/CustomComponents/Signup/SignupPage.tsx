"use client";

import SignupForm1 from "./SignupForm1";

interface SubmitHandlerData {
  name: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const handleSignup = async (data: SubmitHandlerData): Promise<void> => {
    console.log("Form Data:", data);
    // API call বা toast here
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm1 onSubmit={handleSignup} bgColor={"bg-sky-400/10"} />
    </div>
  );
}

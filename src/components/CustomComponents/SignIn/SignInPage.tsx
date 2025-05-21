"use client";

import SignInForm1 from "./SignInForm1";

interface SubmitHandlerData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const handleSignIn = async (data: SubmitHandlerData): Promise<void> => {
    console.log("Form Data:", data);
    // API call বা toast here
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm1 onSubmit={handleSignIn} bgColor={"bg-sky-400/10"} />
    </div>
  );
}

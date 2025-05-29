// app/layout.tsx
// import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/QueryClientProvider";
import LayoutProvider from "@/providers/LayoutProvider";
import AuthProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "title",
  description: "description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>E Delivery Client</title>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ReactQueryProvider>
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

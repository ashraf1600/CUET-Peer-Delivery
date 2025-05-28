// lib/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      stdId: string;
      name: string | null | undefined;
      email: string | null | undefined;
      hallName: string;
      description: string;
      role: string;
    };
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      stdId: string;
      name: string;
      email: string;
      hallName: string;
      description: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    name?: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user?: {
      _id: string;
      stdId: string;
      name: string;
      email: string;
      hallName: string;
      description: string;
      role: string;
    };
  }
}

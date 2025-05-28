// lib/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { AxiosError } from "axios";
import { post } from "./api/handlers";

type LoginResponse = {
  token: string;
  user: {
    _id: string;
    stdId: string;
    name: string;
    email: string;
    hallName: string;
    description: string;
    role: string;
  };
};

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials === null) throw new Error("Missing credentials");

        try {
          const response = await post<LoginResponse>(
            "/api/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              "Content-Type": "application/json",
            },
          );
          console.log("API Response:", response);

          if (response.token) {
            // Return an object that matches your User interface
            return {
              id: response.user._id,
              email: response.user.email,
              name: response.user.name,
              token: response.token,
              user: response.user,
            };
          }
          return null;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Login failed");
          }
          console.error("Authentication error:", error);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // Include both the required fields and your custom data
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.token = (user as any).token;
        token.user = (user as any).user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          // id: token.id,
          email: token.email,
          name: token.name,
        };
        (session as any).token = token.token;
        (session as any).user = token.user;
      }
      return session;
    },
    // authorized: async ({ auth }) => {
    //   return !!auth;
    // },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  debug: process.env.NODE_ENV === "development",
  // secret: "hbbinmkbnnkvdfjvskvnkvDDVVfvmndjbvshbvhb",
  secret:
    process.env.NEXTAUTH_SECRET || "hbbinmkbnnkvdfjvskvnkvDDVVfvmndjbvshbvhb",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
export const auth = handler.auth;

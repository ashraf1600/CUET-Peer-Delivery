// lib/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { AxiosError } from "axios";
import { post } from "./api/handlers";

type LoginResponse = {
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

          if (response.accessToken) {
            // Return an object that matches your User interface
            return {
              id: response.user._id,
              email: response.user.email,
              name: response.user.name,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
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
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
        token.accessTokenExpires = Math.floor(Date.now() / 1000) + 60;
      }
      // Check if the current time is past the access token's expiry time
      const now = Math.floor(Date.now() / 1000);
      if (token.accessTokenExpires && now > token.accessTokenExpires) {
        try {
          // Attempt to refresh the access token
          const response = await post<{ accessToken: string }>(
            "/api/auth/refresh-token",
            {
              refreshToken: token.refreshToken,
            },
            {
              "Content-Type": "application/json",
            },
          );

          // Update the token with the new access token
          token.accessToken = response.accessToken;
          token.accessTokenExpires = now + 60; // Set new expiry time (1 minute from now)
        } catch (error) {
          console.error("Error refreshing access token", error);
          // Handle refresh token error (e.g., redirect to login)
          return { ...token, error: "RefreshAccessTokenError" };
        }
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
        (session as any).accessToken = token.accessToken;
        (session as any).user = token.user;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      // Redirect to login page if there's an error with the refresh token
      if (url === baseUrl) {
        return `${process.env.NEXT_PUBLIC_BASE_URL}/login`;
      }
      return url;
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

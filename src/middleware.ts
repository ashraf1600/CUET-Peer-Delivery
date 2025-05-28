// // middleware.ts
// import { auth } from "@/lib/auth";
// import { NextResponse } from "next/server";

// export default auth((req: any) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isAuthRoute = nextUrl.pathname.startsWith("/dashboard");
//   const isPublicRoute = ["/login", "/register"].includes(nextUrl.pathname);

//   if (isPublicRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL("/dashboard", nextUrl));
//   }

//   if (isAuthRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", nextUrl));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//     "/dashboard/:path*",
//   ],
// };

// middleware.ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Check if the user is trying to access a protected route
  if (!token && !request.nextUrl.pathname.startsWith("/auth/login")) {
    // Redirect to login page if there is no token
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
  ],
};

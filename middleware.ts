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

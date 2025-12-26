import { NextRequest, NextResponse } from "next/server"
import { authConfig } from "./auth.config";
import NextAuth from "next-auth"
import { apiAuthPrefix, apiRoute, authRoute, DEFAULT_LOGIN_REDIRECT } from "./routes";
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function proxy(req) {
  // Your custom middleware logic goes here
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiRoute = nextUrl.pathname.startsWith(apiRoute);
  const isAuthRoute = authRoute.includes(nextUrl.pathname);

   if (isApiAuthRoute || isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null; // อนุญาตให้เข้าถึง /auth/login และ /auth/register
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
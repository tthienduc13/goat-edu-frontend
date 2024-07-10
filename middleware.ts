import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ONBOARDING_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  if (!req.auth) {
    return;
  }
  const isLoggedIn = !!req.auth;
  const isNewUser = !!req.auth.user?.isNewUser;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute || isPublicRoute) {
    if (isLoggedIn) {
      if (
        isNewUser &&
        nextUrl.pathname !== DEFAULT_ONBOARDING_REDIRECT &&
        nextUrl.pathname === DEFAULT_LOGIN_REDIRECT
      ) {
        return Response.redirect(new URL(DEFAULT_ONBOARDING_REDIRECT, nextUrl));
      } else if (
        !isNewUser &&
        nextUrl.pathname.startsWith(DEFAULT_ONBOARDING_REDIRECT)
      ) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

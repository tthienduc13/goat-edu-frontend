import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import Facebook from "next-auth/providers/facebook";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  ...authConfig,
});

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { googleLogin, googleRegister } from "./app/api/auth/auth.api";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

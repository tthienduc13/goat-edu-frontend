import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: string;
    token: string;
  }

  interface User extends DefaultUser {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: string;
    token: string;
  }
}

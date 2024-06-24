import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Role } from "./types/role";

declare module "next-auth" {
  interface Session extends DefaultSession {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
    subscription: boolean;
    isNewUser: boolean;
  }

  interface User extends DefaultUser {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
    isNewUser: boolean;
    subscription: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
    isNewUser: boolean;
    subscription: boolean;
  }
}

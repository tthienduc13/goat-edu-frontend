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
    phoneNumber: string;
  }

  interface User extends DefaultUser {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
    isNewUser: boolean;
    phoneNumber: string;
    subscription: boolean;
  }
  interface User extends AdapterUser {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
    isNewUser: boolean;
    phoneNumber: string;
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
    phoneNumber: string;
    subscription: boolean;
  }
}

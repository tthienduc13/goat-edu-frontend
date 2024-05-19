import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      emailVerify: boolean;
      role: string;
      token: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    username: string;
    emailVerify: boolean;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    emailVerify: boolean;
    role: string;
    token: string;
  }
}

import { NoInfer } from "@tanstack/react-table";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      password: string;
      phoneNumber: string;
      subscription: string;
      subscriptionEnd: Date;
      provider: string;
      emailVerify: boolean;
      roleId: string;
      walletId: string;
      createdAt: Date;
      updatedAt: Date;
      role: string;
      wallet: string;
      achievements: any[];
      answers: any[];
      discussions: any[];
      enrollments: any[];
      flashcards: any[];
      notes: any[];
      notifications: any[];
      reports: any[];
      isDeleted: boolean;
      token: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    username: string;
    password: string;
    phoneNumber: string;
    subscription: string;
    subscriptionEnd: Date;
    provider: string;
    emailVerify: boolean;
    roleId: string;
    walletId: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    wallet: string;
    achievements: any[];
    answers: any[];
    discussions: any[];
    enrollments: any[];
    flashcards: any[];
    notes: any[];
    notifications: any[];
    reports: any[];
    isDeleted: boolean;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    password: string;
    phoneNumber: string;
    subscription: string;
    subscriptionEnd: Date;
    provider: string;
    emailVerify: boolean;
    roleId: string;
    walletId: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    wallet: string;
    achievements: any[];
    answers: any[];
    discussions: any[];
    enrollments: any[];
    flashcards: any[];
    notes: any[];
    notifications: any[];
    reports: any[];
    isDeleted: boolean;
    token: string;
  }
}

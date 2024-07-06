import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

import { googleLogin, googleRegister, login } from "@/app/api/auth/auth.api";
import { LoginSchema } from "@/schemas/auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SCERET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { username, password } = validatedFields.data;
            const response = await login({
              username: username,
              password: password,
            });
            const user = response.data;
            if (user) {
              if (user.role.roleName === "Admin") {
                return null;
              }
              return user;
            } else {
              return null;
            }
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/onboarding?page=intro",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        } else if (account?.provider === "google") {
          const accountRegisterData = {
            name: user.name,
            email: user.email,
            roleId: user.email?.endsWith("fe.edu.vn")
              ? "541ed739-9940-4fb1-8c5e-9f871046390d"
              : "73f0a30e-7a5f-4087-b7e9-4bb87cff6248",
            picture: user.image,
          };

          const registerResponse = await googleRegister(accountRegisterData);

          if (registerResponse.status === 200) {
            const loginResponse = await googleLogin(accountRegisterData.email!);

            if (loginResponse.status === 200) {
              const token = loginResponse.data.data;
              user.token = token;
              user.isNewUser = loginResponse.data.data.isNewUser;

              return true;
            } else {
              console.error(
                "Login response status is not 200:",
                loginResponse.status
              );
              return false;
            }
          } else if (registerResponse.status === 400) {
            const loginResponse = await googleLogin(accountRegisterData.email!);

            if (loginResponse.status === 200) {
              const token = loginResponse.data;
              user.token = token;

              return true;
            } else {
              console.error(
                "Login response status is not 200:",
                loginResponse.status
              );
              return false;
            }
          } else {
            console.error(
              "Registration response status is not 200 or 400:",
              registerResponse.status
            );
            return false;
          }
        }

        return false;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session.user.image) {
        token.picture = session.user.image;
      }

      if (
        trigger === "update" &&
        session.user.name &&
        session.user.phoneNumber
      ) {
        token.name = session.user.name;
        token.phoneNumber = session.user.phoneNumber;
      }

      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.name = user.fullname;
        token.emailVerify = user.emailVerify;
        token.role = user.role;
        token.token = user.token;
        token.subscription = user.subscription;
        token.isNewUser = user.isNewUser;
        token.phoneNumber = user.phoneNumber;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.emailVerify = token.emailVerify;
        session.user.role = token.role;
        session.user.token = token.token;
        session.user.subscription = token.subscription;
        session.user.isNewUser = token.isNewUser;
        session.user.phoneNumber = token.phoneNumber;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  secret: process.env.JWT_SCERET,
} satisfies NextAuthConfig;

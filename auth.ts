import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { googleLogin, googleRegister } from "./app/api/auth/auth.api";

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
    async session({ session, token }) {
      if (session?.user) {
        console.log(session.user);
        session.user.id = token.userId;
        session.user.username = token.username;
        session.user.name = token.fullname;
        session.user.emailVerify = token.emailVerify;
        session.user.role = token.role;
        session.user.token = token.token;
        session.user.fullname = token.fullname;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.fullname = user.fullname;
        token.emailVerify = user.emailVerify;
        token.role = user.role;
        token.token = user.token;
      }
      console.log(token);
      return token;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  ...authConfig,
});

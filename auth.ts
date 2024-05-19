import NextAuth from "next-auth";
import authConfig from "@/auth.config";

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
    async session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username;
        session.user.emailVerify = token.emailVerify;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.emailVerify = user.emailVerify;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  ...authConfig,
});

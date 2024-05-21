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
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.fullname = user.fullname;
        token.emailVerify = user.emailVerify;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
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
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  ...authConfig,
});

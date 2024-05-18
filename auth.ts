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
        session.user.password = token.password;
        session.user.phoneNumber = token.phoneNumber;
        session.user.subscription = token.subscription;
        session.user.subscriptionEnd = token.subscriptionEnd;
        session.user.provider = token.provider;
        session.user.emailVerify = token.emailVerify;
        session.user.roleId = token.roleId;
        session.user.walletId = token.wallet;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
        session.user.role = token.role;
        session.user.wallet = token.wallet;
        session.user.achievements = token.achievements;
        session.user.answers = token.answers;
        session.user.discussions = token.discussions;
        session.user.enrollments = token.enrollments;
        session.user.flashcards = token.flashcards;
        session.user.notes = token.notes;
        session.user.notifications = token.notifications;
        session.user.reports = token.reports;
        session.user.isDeleted = token.isDeleted;
        session.user.token = token.token;
        console.log("sessionTOken: ", session.sessionToken);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.password = user.password;
        token.phoneNumber = user.phoneNumber;
        token.subscription = user.subscription;
        token.subscriptionEnd = user.subscriptionEnd;
        token.provider = user.provider;
        token.emailVerify = user.emailVerify;
        token.roleId = user.roleId;
        token.wallet = user.walletId;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
        token.role = user.role;
        token.wallet = user.wallet;
        token.achievements = user.achievements;
        token.answers = user.answers;
        token.discussions = user.discussions;
        token.enrollments = user.enrollments;
        token.flashcards = user.flashcards;
        token.notes = user.notes;
        token.notification = user.notifications;
        token.reports = user.reports;
        token.isDeleted = user.isDeleted;
        token.token = user.token;
        console.log("userToken", user.token);
      }
      return token;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  ...authConfig,
});

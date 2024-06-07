import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { Main } from "./_components/main";

import { auth } from "@/auth";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout = async ({ children }: PlatformLayoutProps) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Main>
        {children}
        <Toaster />
      </Main>
    </SessionProvider>
  );
};

export default PlatformLayout;

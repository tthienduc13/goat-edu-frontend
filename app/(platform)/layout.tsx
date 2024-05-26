import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { Main } from "./_components/main";

import { auth } from "@/auth";

import { SessionProvider } from "next-auth/react";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout = async ({ children }: PlatformLayoutProps) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main className=" z-10 w-full flex relative ">
        <Navbar />
        <Sidebar />
        <Main>{children}</Main>
        <BackgroundBeams className="z-[-1]" />
      </main>
    </SessionProvider>
  );
};

export default PlatformLayout;

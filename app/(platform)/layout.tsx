import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
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
      <main className=" z-10 w-full h-[2000px] flex relative ">
        <Navbar />
        <Sidebar />
        <div className=" z-5 bg-inherit overflow-hidden pt-16 pl-[240px] flex ">
          {children}
        </div>
        <BackgroundBeams className="z-[-1]" />
      </main>
    </SessionProvider>
  );
};

export default PlatformLayout;

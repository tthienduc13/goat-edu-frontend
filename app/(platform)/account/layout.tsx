import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar";
import { Toaster } from "sonner";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <main className=" flex h-[calc(100vh-64px-80px)] w-full">
      <div className="mx-auto h-full ">
        <div className="flex flex-row h-full">
          <Sidebar />
          {children}
          <Toaster />
        </div>
      </div>
    </main>
  );
};

export default AccountLayout;

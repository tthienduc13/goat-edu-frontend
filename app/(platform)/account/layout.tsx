import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <main className="flex flex-row mx-auto h-[calc(100vh-64px)] w-full">
      <Sidebar />
      {children}
    </main>
  );
};

export default AccountLayout;
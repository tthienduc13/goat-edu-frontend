import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <main className="h-screen w-full ">
      <Navbar />
      <Sidebar />
      <div className="pl-[240px] dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex h-full">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </div>
    </main>
  );
};

export default PlatformLayout;

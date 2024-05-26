import { Header } from "@/components/landing/header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout = async ({ children }: MarketingLayoutProps) => {
  return (
    <main>
      <Header />
      <div className="absolute w-full left-0 top-[64px] flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default MarketingLayout;

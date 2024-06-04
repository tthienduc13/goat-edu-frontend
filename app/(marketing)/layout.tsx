import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout = async ({ children }: MarketingLayoutProps) => {
  return (
    <main>
      <Header />
      <div className=" w-full absolute flex flex-col gap-y-[120px] items-center justify-center">
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default MarketingLayout;

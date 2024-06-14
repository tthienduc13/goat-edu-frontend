import { Footer } from "./_components/footer/footer";
import { Header } from "./_components/header/header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout = async ({ children }: MarketingLayoutProps) => {
  return (
    <main>
      <Header />
      <div className=" w-full mt-16 absolute flex flex-col gap-y-[120px] items-center justify-center">
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default MarketingLayout;

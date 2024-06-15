import { Logo } from "@/components/custom/logo";

interface SubcribeLayoutProps {
  children: React.ReactNode;
}

const SubcribeLayout = ({ children }: SubcribeLayoutProps) => {
  return (
    <div className="fixed z-10 bg-background w-screen h-screen left-0 top-0">
      <div className="h-16 flex items-center bg-background px-10">
        <Logo size="lg" href="/browse" />
      </div>
      <div className="py-5 ">{children}</div>
    </div>
  );
};

export default SubcribeLayout;

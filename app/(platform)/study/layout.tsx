import { Toaster } from "@/components/ui/sonner";
import StudySideMenu from "./_components/side-menu";
interface StudyLayoutProps {
  children: React.ReactNode;
}

const StudyLayout = async ({ children }: StudyLayoutProps) => {
  return (
    <div className="w-full">
      {children}
      <Toaster />
    </div>
  );
};

export default StudyLayout;

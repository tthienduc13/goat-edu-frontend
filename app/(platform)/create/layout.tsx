import { Toaster } from "sonner";

interface CreateLayoutProps {
  children: React.ReactNode;
}

const CreateLayout = ({ children }: CreateLayoutProps) => {
  return (
    <main className="w-full h-full">
      {children}
      <Toaster />
    </main>
  );
};

export default CreateLayout;

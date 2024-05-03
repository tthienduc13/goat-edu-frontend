import { ModeToggle } from "@/components/mode-toggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center ">
      <ModeToggle></ModeToggle>
      {children}
    </div>
  );
};

export default AuthLayout;

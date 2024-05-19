import { BackgroundBeams } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
import "@/app/globals.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden relative w-full flex items-center justify-center ">
      <div className="z-50 w-full flex items-center justify-center ">
        {children}
      </div>
      <Meteors number={60} />
      <BackgroundBeams />
    </div>
  );
};

AuthLayout.theme = "dark";

export default AuthLayout;

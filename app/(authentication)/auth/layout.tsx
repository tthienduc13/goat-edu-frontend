import { BackgroundBeams } from "@/components/ui/background-beams";

import "@/app/globals.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden relative w-full flex items-center justify-center ">
      <div className="z-50 w-full flex items-center justify-center ">
        {children}
      </div>
      <BackgroundBeams />
    </div>
  );
};

AuthLayout.theme = "dark";

export default AuthLayout;

import Link from "next/link";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

import { SparklesCore } from "./ui/sparkles";
import Image from "next/image";
import LogoImage from "@/public/logo.png";
import { useSidebar } from "@/hooks/use-sidebar";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface LogoProps {
  size: "sm" | "lg";
  isLanding?: boolean;
}

export const Logo = ({ size, isLanding }: LogoProps) => {
  const { isOpen } = useSidebar();
  return (
    <Link href="/">
      <div className="h-10 flex flex-row items-center">
        {isOpen ||
          (isLanding && (
            <div className="h-8 transition-all duration-500 w-full flex flex-col items-center justify-center  rounded-md">
              <div
                className={cn(
                  "hover:opacity-75 relative z-20 transition  gap-x-2 hidden md:flex",
                  size === "lg" ? "items-end" : "items-center"
                )}
              >
                <p
                  className={cn(
                    " text-transparent bg-clip-text bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]",
                    headingFont.className,
                    size === "lg" ? "text-3xl" : "text-base"
                  )}
                >
                  goat
                  <span
                    className={cn(
                      " font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]",
                      textFont.className,
                      size === "lg" ? "text-xl" : "text-xs"
                    )}
                  >
                    .edu
                  </span>
                </p>
              </div>
              <div className="w-full h-4 relative">
                <div className="absolute inset-x-5 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-5 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                {/* <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" /> */}
                {/* <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" /> */}

                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />

                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
              </div>
            </div>
          ))}
      </div>
    </Link>
  );
};

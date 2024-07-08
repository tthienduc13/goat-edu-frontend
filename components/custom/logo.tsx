import Link from "next/link";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface LogoProps {
  size: "sm" | "lg";
  href?: string;
}

export const Logo = ({ size, href = "/" }: LogoProps) => {
  return (
    <Link href={href}>
      <div className="h-10 flex flex-row items-center">
        <div className="h-8 transition-all duration-500 w-full flex flex-col items-center justify-center  rounded-md">
          <div
            className={cn(
              "hover:opacity-75 relative z-20 transition  gap-x-2  md:flex",
              size === "lg" ? "items-end" : "items-center"
            )}
          >
            <h1
              className={cn(
                " text-transparent bg-clip-text bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]",
                headingFont.className,
                size === "lg" ? "text-2xl" : "text-base"
              )}
            >
              GoatEdu
              {/* <span
                className={cn(
                  " font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]",
                  textFont.className,
                  size === "lg" ? "text-xl" : "text-xs"
                )}
              >
                .edu
              </span> */}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

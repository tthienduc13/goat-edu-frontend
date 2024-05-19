import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import LogoLight from "@/public/logo_light.svg";
import { cn } from "@/lib/utils";

import { Arrow, TooltipArrow } from "@radix-ui/react-tooltip";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface LogoProps {
  size: "sm" | "lg";
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <Link href="/">
      <div
        className={cn(
          "hover:opacity-75 transition  gap-x-2 hidden md:flex",
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
    </Link>
  );
};

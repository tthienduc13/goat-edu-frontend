"use client";
import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const Header = () => {
  return (
    <header className="max-w-[1200px] fixed top-0 px-6 mt-6 md:mt-20 w-full mx-auto flex items-center justify-between">
      <Logo size="lg"></Logo>
      <div className="flex items-center gap-3">
        <span className="text-[#a8b3cf] text-base cursor-pointer hidden md:block">
          Already a daily.quiz member?
        </span>
        <Button
          className="bg-inherit hover:cursor-pointer"
          size="sm"
          variant="outline"
          asChild
        >
          <div
            className={cn("text-white font-bold font-sans", textFont.className)}
          >
            Login
          </div>
        </Button>
      </div>
    </header>
  );
};

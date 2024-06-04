"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main
      className={cn(
        "z-5 p-10 bg-inherit left-[240px] w-[calc(100%-240px)] absolute top-16 transition-all duration-500 overflow-hidden flex"
      )}
    >
      {children}
    </main>
  );
};

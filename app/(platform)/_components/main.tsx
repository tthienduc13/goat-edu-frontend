"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const { isOpen } = useSidebar();
  return (
    <main
      className={cn(
        "z-5 bg-inherit absolute top-16 transition-all duration-500 overflow-hidden flex",
        isOpen ? "left-[240px]" : "left-[78px]",
        isOpen ? "w-[calc(100%-240px)]" : "w-[calc(100%-78px)]"
      )}
    >
      {children}
    </main>
  );
};

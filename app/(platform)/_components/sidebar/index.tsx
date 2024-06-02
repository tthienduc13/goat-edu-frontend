"use client";
import { cn } from "@/lib/utils";

import { UserItem } from "./user-item";
import { SubcribeButton } from "./subcirbe-button";
import { SideNav } from "./side-nav";

import { NavItems } from "@/constants/side-nav";
import { useSidebar } from "@/hooks/use-sidebar";
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [isMouseHovered, setIsMouseHoverd] = useState<boolean>(false);
  const { isOpen, toggle } = useSidebar();
  return (
    <aside
      onMouseEnter={() => setIsMouseHoverd(true)}
      onMouseLeave={() => setIsMouseHoverd(false)}
      className={cn(
        "fixed h-[calc(100vh-64px)] top-[64px] transition-all duration-200  z-50  left-0 gap-y-4  flex p-3 flex-col",
        isOpen ? " w-[240px]" : "w-[78px]"
      )}
    >
      {isMouseHovered && (
        <div className="absolute -top-1 -right-4">
          <Button onClick={() => toggle()} variant="outline" size="icon">
            {isOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      )}
      <div className="border-t-[1px]">
        <UserItem isOpen={isOpen} />
      </div>
      <div className="flex-1 flex flex-col gap-y-2">
        <SideNav items={NavItems} />
      </div>
      {isOpen && <SubcribeButton />}
    </aside>
  );
};

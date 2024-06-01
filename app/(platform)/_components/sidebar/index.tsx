"use client";
import { cn } from "@/lib/utils";

import { UserItem } from "./user-item";
import { SubcribeButton } from "./subcirbe-button";
import { SideNav } from "./side-nav";

import { NavItems } from "@/constants/side-nav";
import { useSidebar } from "@/hooks/use-sidebar";
import { Logo } from "@/components/custom/logo";

export const Sidebar = () => {
  const { isOpen, toggle } = useSidebar();
  return (
    <aside
      onMouseEnter={() => {
        toggle();
      }}
      onMouseLeave={() => {
        toggle();
      }}
      className={cn(
        "fixed h-screen transition-all duration-500 z-50  left-0 gap-y-4  flex p-3 flex-col",
        isOpen ? " w-[240px]" : "w-[78px]"
      )}
    >
      <Logo size="lg" />
      <div className="border-t-[1px]">
        <UserItem isOpen={isOpen} />
      </div>
      <div className="mt-3 flex-1 flex flex-col gap-y-2">
        <SideNav items={NavItems} />
      </div>
      {isOpen && <SubcribeButton />}
    </aside>
  );
};

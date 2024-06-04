"use client";
import { cn } from "@/lib/utils";

import { UserItem } from "./user-item";
import { SubcribeButton } from "./subcribe-button";
import { SideNav } from "./side-nav";

import { NavItems } from "@/constants/side-nav";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { ReportButton } from "@/components/custom/buttons/report-button";

export const Sidebar = () => {
  return (
    <aside
      className={cn(
        "fixed h-[calc(100vh-64px)] w-[240px] top-[64px] left-0 gap-y-4  flex p-3 flex-col"
      )}
    >
      <UserItem />
      <div className="flex flex-1 w-full py-4 border-t-[1px]">
        <SideNav items={NavItems} />
      </div>
      <SubcribeButton />
      <div className="border-t-[1px] pt-4 flex justify-between items-center flex-row">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <CircleHelp className="h-4 w-4" />
        </Button>
        <ReportButton />
        <ModeToggle />
      </div>
    </aside>
  );
};

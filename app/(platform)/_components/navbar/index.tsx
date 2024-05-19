"use client";
import { Logo } from "@/components/logo";

import { SearchInput } from "./search-input";
import { UserButton } from "./user-button";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  return (
    <div className="h-16 w-full dark:bg-black flex items-center px-10 border-b-[1px] ">
      <Logo size="lg" />
      <SearchInput />
      <div className="flex items-center gap-x-2">
        <Hint label="Create" sideOffset={10}>
          <Button className="h-10 w-10" variant="custom" size="icon">
            <Plus className="text-muted-foreground" />
          </Button>
        </Hint>
        <Hint label="Notification" sideOffset={10}>
          <Button className="h-10 w-10" variant="custom" size="icon">
            <Bell className="text-muted-foreground" />
          </Button>
        </Hint>
        <UserButton />
        <ModeToggle />
      </div>
    </div>
  );
};

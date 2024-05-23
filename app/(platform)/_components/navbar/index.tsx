"use client";
import { Logo } from "@/components/logo";

import { SearchInput } from "./search-input";
import { UserButton } from "./user-button";
import { NotificationButton } from "./notification-button";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Navbar = () => {
  // const user = useCurrentUser();
  // if (!user) return null;
  return (
    <div className="h-16 bg-background fixed z-10 top-0 left-0 w-full  flex items-center px-10 border-b-[1px] ">
      <Logo size="lg" />
      <SearchInput />
      <div className="flex items-center gap-x-2">
        <Hint label="Create" sideOffset={10}>
          <Button className="h-10 w-10" variant="custom" size="icon">
            <Plus />
          </Button>
        </Hint>
        <NotificationButton
        // user={user}
        />
        <UserButton
        // user={user}
        />
        <ModeToggle />
      </div>
    </div>
  );
};

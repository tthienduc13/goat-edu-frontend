"use client";
import { Logo } from "@/components/custom/logo";

import { SearchInput } from "./search-input";
import { UserButton } from "./user-button";
import { NotificationButton } from "./notification-button";
import { CreateButton } from "./create-button";

import { ModeToggle } from "@/components/mode-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  // const user = useCurrentUser();
  // if (!user) return null;
  const { isOpen } = useSidebar();
  return (
    <div
      className={cn(
        "h-16 bg-background fixed z-10 top-0  w-full  flex justify-center items-center px-10 ",
        isOpen ? "left-[240px]" : "left-[78px]",
        isOpen ? "w-[calc(100%-240px)]" : "w-[calc(100%-78px)]"
      )}
    >
      <SearchInput />
      <div className="flex items-center gap-x-2">
        <CreateButton />
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

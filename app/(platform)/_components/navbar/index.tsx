import { cn } from "@/lib/utils";

import { Logo } from "@/components/custom/logo";

import { SearchInput } from "./search-input";
import { UserButton } from "./user-button";
import { NotificationButton } from "./notification-button";
import { CreateButton } from "./create-button";

export const Navbar = () => {
  return (
    <div
      className={cn(
        "h-16 bg-background fixed z-10 top-0  w-full  flex justify-center items-center px-10 "
      )}
    >
      <Logo size="lg" href="/browse" />
      <SearchInput />
      <div className="flex items-center gap-x-2">
        <CreateButton />
        <NotificationButton />
        <UserButton />
      </div>
    </div>
  );
};

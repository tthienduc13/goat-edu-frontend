import { cn } from "@/lib/utils";

import { Logo } from "@/components/custom/logo";

import { SearchInput } from "./search-input";
import { UserButton } from "./user-button/user-button";
import { CreateButton } from "./create-button";
import { NotificationButton } from "./notification/notification-button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div
      className={cn(
        "h-16 bg-background fixed z-10 top-0 w-full  flex justify-center items-center px-10 "
      )}
    >
      <div className="flex items-center gap-x-5">
        <Logo size="lg" href="/browse" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/browse" legacyBehavior passHref>
                <NavigationMenuLink
                  defaultChecked={true}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "font-bold text-sm"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/discussed" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "font-bold text-sm"
                  )}
                >
                  Discussions
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <SearchInput />
      <div className="flex items-center gap-x-2">
        <CreateButton />
        <NotificationButton />
        <UserButton />
      </div>
    </div>
  );
};

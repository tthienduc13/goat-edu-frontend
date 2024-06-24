import { cn } from "@/lib/utils";
import Link from "next/link";

import { Logo } from "@/components/custom/logo";

import { SearchInput } from "./search-input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import dynamic from "next/dynamic";

const DynamicUserButton = dynamic(
  () => import("./user-button/user-button").then((res) => res.UserButton),
  {
    ssr: false,
  }
);

const DynamicCreateButton = dynamic(
  () => import("./create-button").then((res) => res.CreateButton),
  {
    ssr: false,
  }
);

const DynamicNotificationButton = dynamic(
  () =>
    import("./notification/notification-button").then(
      (res) => res.NotificationButton
    ),
  {
    ssr: false,
  }
);

export const Navbar = () => {
  return (
    <div
      className={cn(
        "h-16 bg-background fixed z-10 top-0 w-screen  flex justify-center items-center px-10 "
      )}
    >
      <div className="flex items-center gap-x-5">
        <Logo size="lg" href="/browse" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/browse" legacyBehavior passHref>
                <NavigationMenuLink
                  defaultChecked
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
        <DynamicCreateButton />
        <DynamicNotificationButton />
        <DynamicUserButton />
      </div>
    </div>
  );
};

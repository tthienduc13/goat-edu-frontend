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
import { Menu } from "lucide-react";
import usePlatformMobileNavStore from "@/stores/usePlatformMobileNavStore";

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
const DynamicMobileNav = dynamic(
  () => import("./mobile-nav-bar").then((res) => res.MobileNavbar),
  {
    ssr: false,
  }
);

export const Navbar = () => {
  const { isPlatformOpenMobileNav, setIsPlatformOpenMobileNav } =
    usePlatformMobileNavStore();
  return (
    <div
      className={cn(
        "h-16 bg-background fixed z-10 top-0 w-screen  flex justify-center items-center px-5 sm:px-10 "
      )}
    >
      <div className="flex items-center gap-x-5">
        <Menu
          onClick={() => setIsPlatformOpenMobileNav(!isPlatformOpenMobileNav)}
          className="h-8 w-8 xl:hidden block"
        />
        <div className="hidden md:block">
          <Logo size="lg" href="/browse" />
        </div>
        <div className="xl:block hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/browse" legacyBehavior passHref>
                  <NavigationMenuLink
                    defaultChecked
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "font-semibold text-base"
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
                      "font-semibold text-base"
                    )}
                  >
                    Discussions
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/subjects" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "font-semibold text-base"
                    )}
                  >
                    Courses
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <SearchInput />
      <div className="flex items-center gap-x-2">
        <div className=" items-center xl:flex hidden gap-x-2">
          <DynamicCreateButton />
          <DynamicNotificationButton />
        </div>
        <DynamicUserButton />
      </div>
      <DynamicMobileNav />
    </div>
  );
};

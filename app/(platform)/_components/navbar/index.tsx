import { cn } from "@/lib/utils";
import Link from "next/link";

import { Logo } from "@/components/custom/logo";

import { SearchInput } from "./search/search-input";

import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import usePlatformMobileNavStore from "@/stores/usePlatformMobileNavStore";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const user = useCurrentUser();
  const pathName = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { isPlatformOpenMobileNav, setIsPlatformOpenMobileNav } =
    usePlatformMobileNavStore();

  const [activeElement, setActiveElement] = useState<HTMLAnchorElement | null>(
    null
  );
  const borderRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/browse" && pathName === "/browse") return true;

    if (
      href === "/create" &&
      (pathName === "/discussed/new" || pathName.includes("/flashcards/new"))
    ) {
      return true;
    }
    if (href === "/discussed" && pathName.includes("/discussed")) return true;
    if (href === "/subjects" && pathName.includes("/subjects")) return true;
    if (href === "/subjects" && pathName.includes("/study")) return true;

    return false;
  };

  useEffect(() => {
    if (activeElement && borderRef.current) {
      const { offsetLeft, offsetWidth } = activeElement;
      borderRef.current.style.width = `${offsetWidth}px`;
      borderRef.current.style.left = `${offsetLeft}px`;
    }
  }, [activeElement]);

  return (
    <div
      className={cn(
        "h-16 bg-background fixed z-10 top-0 w-screen  flex justify-center items-center px-5 lg:px-10 "
      )}
    >
      <div className="flex items-center gap-x-5">
        {!isDesktop && (
          <Menu
            onClick={() => setIsPlatformOpenMobileNav(!isPlatformOpenMobileNav)}
            className="h-8 w-8 xl:hidden block "
          />
        )}
        {isTablet && <Logo size="lg" href="/browse" />}
        {isDesktop && (
          <div className="flex relative flex-row gap-x-4">
            <div
              ref={borderRef}
              className="absolute h-1 rounded-t-[10px] -bottom-1 bg-violet-500 transition-all duration-300"
            />
            <Link
              href="/browse"
              onClick={() => setActiveElement(null)}
              className={`text-base font-semibold ${
                isActive("/browse") ? "active" : ""
              }`}
              ref={isActive("/browse") ? setActiveElement : null}
            >
              Home
            </Link>
            <Link
              href="/discussed"
              onClick={() => setActiveElement(null)}
              className={`text-base font-semibold ${
                isActive("/discussed") ? "active" : ""
              }`}
              ref={isActive("/discussed") ? setActiveElement : null}
            >
              Discussions
            </Link>
            <Link
              href="/subjects"
              onClick={() => setActiveElement(null)}
              className={`text-base font-semibold ${
                isActive("/subjects") ? "active" : ""
              }`}
              ref={isActive("/subjects") ? setActiveElement : null}
            >
              Courses
            </Link>
          </div>
        )}
      </div>
      <div className="w-full px-5 lg:px-0">
        <SearchInput />
      </div>
      <div className="flex items-center gap-x-2">
        {isDesktop && (
          <div className=" flex items-center gap-x-2">
            <DynamicCreateButton />
            <DynamicNotificationButton />
          </div>
        )}
        {isDesktop && <DynamicUserButton />}
        {!isDesktop && !user?.subscription && !isMobile && (
          <Button className="xl:hidden block">Upgrade to pro ✨</Button>
        )}
      </div>
      {!isDesktop && <DynamicMobileNav />}
    </div>
  );
};

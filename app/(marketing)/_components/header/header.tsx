"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/logo";
import { Hint } from "@/components/custom/hint";

import { NavBar } from "./nav-bar";
import { Menu } from "lucide-react";
import useMobileNavStore from "@/stores/useMobileNavStore";

const DynamicMobileNav = dynamic(
  () =>
    import("../../_components/header/mobile-nav-bar").then(
      (res) => res.MobileNavbar
    ),
  {
    ssr: false,
  }
);

export const Header = () => {
  const { isOpenMobileNav, setIsOpenMobileNav } = useMobileNavStore();
  return (
    <div className="h-16 z-50 bg-background fixed top-0 left-0 w-full  flex items-center px-5 sm:px-10 ">
      <div className="w-full sm:w-fit flex flex-row justify-between items-center">
        <Logo size="lg" isLanding={true} />
        <Menu
          onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
          className="h-8 w-8 float-end block sm:hidden"
        />
      </div>
      <DynamicMobileNav />
      <div className="flex-1 px-0 sm:px-10 ">
        <div className="w-full hidden md:block">
          <NavBar />
        </div>
      </div>

      <div className="space-x-2 hidden sm:flex">
        <Hint
          label="To login page"
          side="bottom"
          align="center"
          sideOffset={10}
        >
          <Button variant="custom" asChild>
            <Link href="/auth/login"> Login</Link>
          </Button>
        </Hint>
        <Hint
          label="To register page"
          side="bottom"
          align="center"
          sideOffset={10}
        >
          <Button variant="default" asChild>
            <Link href="/auth/register">Sign up</Link>
          </Button>
        </Hint>
      </div>
    </div>
  );
};

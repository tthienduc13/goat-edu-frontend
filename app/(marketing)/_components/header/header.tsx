"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/logo";
import { Hint } from "@/components/custom/hint";

import Link from "next/link";

import { NavBar } from "./nav-bar";

export const Header = () => {
  return (
    <div className="h-16 z-50 bg-background fixed top-0 left-0 w-full  flex items-center px-10 ">
      <Logo size="lg" isLanding={true} />
      <div className="flex-1 px-10">
        <NavBar />
      </div>

      <div className="space-x-2">
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

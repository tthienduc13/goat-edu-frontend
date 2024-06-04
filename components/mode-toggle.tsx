"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hint } from "./custom/hint";

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const handleChangeTheme = () => {
    theme === "dark" ? setTheme("ligth") : setTheme("dark");
  };

  return (
    <Hint label="Change theme" sideOffset={10}>
      <Button
        onClick={handleChangeTheme}
        className="h-10 w-10 text-slate-900 dark:text-white"
        variant="ghost"
        size="icon"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Hint>
  );
};

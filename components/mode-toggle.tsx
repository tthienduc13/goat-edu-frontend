"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const handleChangeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div
      onClick={handleChangeTheme}
      className=" text-slate-900 flex flex-row dark:text-white px-0 py-0"
    >
      <SunIcon className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span>Change theme</span>
    </div>
  );
};

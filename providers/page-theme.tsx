"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function PageTheme({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark"); //set your theme here after component mounts
  }, [setTheme]);

  return <div className="w-full h-full">{children}</div>;
}

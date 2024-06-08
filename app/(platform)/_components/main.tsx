"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import Reloading from "@/components/reloading";
import { NoteButton } from "@/components/note/note-button";

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsloading(false);
    }, 2000);

    const minimumLoadingTime = 2000;
    const additionalTime = minimumLoadingTime - 2000;
    if (additionalTime > 0) {
      setTimeout(() => {
        setIsloading(false);
      }, additionalTime);
    }

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  return (
    <>
      {isLoading ? <Reloading /> : null}
      <div className="min-h-screen w-full flex relative ">
        <Navbar />
        <Sidebar />
        <div
          className={cn(
            "z-5 p-10 bg-inherit left-[240px] w-[calc(100%-240px)] absolute top-16 transition-all duration-500 overflow-hidden flex"
          )}
        >
          {children}
        </div>
        <NoteButton />
      </div>
    </>
  );
};

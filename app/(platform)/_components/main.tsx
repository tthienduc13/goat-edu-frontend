"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { Navbar } from "./navbar";

import Reloading from "@/components/reloading";
import { NoteOptionButton } from "@/components/note/note-control/note-option-button";
import { ModalProvider } from "@/providers/modal-provider";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const pathName = usePathname();

  const excludeNavbar = ["/onboarding"];

  const isExcludeNavbar = excludeNavbar.includes(pathName);

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
      {isLoading && !isExcludeNavbar ? <Reloading /> : null}
      <NextTopLoader
        height={5}
        color="linear-gradient(to right, #7ea6ff, #0042da 43%, #ffbf7d)"
      />
      <div className="min-h-screen w-full flex relative ">
        {!isExcludeNavbar && <Navbar />}
        <div
          className={cn(
            "z-5 p-10 w-full mx-auto mt-16 max-w-[1440px] bg-inherit  transition-all duration-500 overflow-hidden flex"
          )}
        >
          {children}
          <ModalProvider />
        </div>
        {!isExcludeNavbar && <NoteOptionButton />}
      </div>
    </>
  );
};

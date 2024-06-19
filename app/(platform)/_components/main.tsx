"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { Navbar } from "./navbar";

import Reloading from "@/components/reloading";
import { NoteOptionButton } from "@/components/note/note-control/note-option-button";
import { CommandMenu } from "./navbar/user-button/command-menu";
import { CreateFlashcardDialog } from "@/components/dialog/create-flashcard-dialog";
import { ModalProvider } from "@/providers/modal-provider";

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
        <div
          className={cn(
            "z-5 p-10 w-full max-w-[1440px] bg-inherit absolute top-16 left-1/2 transform -translate-x-1/2 transition-all duration-500 overflow-hidden flex"
          )}
        >
          {children}
          <ModalProvider />
        </div>
        <NoteOptionButton />
      </div>
    </>
  );
};

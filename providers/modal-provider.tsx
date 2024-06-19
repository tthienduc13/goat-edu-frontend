"use client";

import { CommandMenu } from "@/app/(platform)/_components/navbar/user-button/command-menu";
import { CreateFlashcardDialog } from "@/components/dialog/create-flashcard-dialog";
import { ReportDialog } from "@/components/dialog/report-dialog";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CommandMenu />
      <CreateFlashcardDialog />
      <ReportDialog />
    </>
  );
};

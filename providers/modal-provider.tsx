"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicCreateFlashcardDialog = dynamic(
  () =>
    import("@/components/dialog/create-flashcard-dialog").then(
      (res) => res.CreateFlashcardDialog
    ),
  { ssr: false }
);

const DynamicCommandMenu = dynamic(
  () =>
    import("@/app/(platform)/_components/navbar/user-button/command-menu").then(
      (res) => res.CommandMenu
    ),
  { ssr: false }
);

const DynamicReportDialog = dynamic(
  () =>
    import("@/components/dialog/report-dialog").then((res) => res.ReportDialog),
  { ssr: false }
);

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
      <DynamicCommandMenu />
      <DynamicCreateFlashcardDialog />
      <DynamicReportDialog />
    </>
  );
};

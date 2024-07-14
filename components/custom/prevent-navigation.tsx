"use client";

import { useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import { LeavingDialog } from "../dialog/leave-dialog";

type PreventNavigationProps = {
  isDirty: boolean;
  backHref: string;
  resetData: () => void;
};

export const PreventNavigation = ({
  isDirty,
  backHref,
  resetData,
}: PreventNavigationProps) => {
  const [leavingPage, setLeavingPage] = useState(false);
  const router = useRouter();

  const confirmationFn = useRef<() => void>(() => {});

  if (typeof window !== "undefined") {
    window.history.pushState(null, document.title, window.location.href);
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;

      if (isDirty) {
        event.preventDefault();

        confirmationFn.current = () => {
          router.push(target.href);
        };

        setLeavingPage(true);
      }
    };

    const handlePopState = () => {
      if (isDirty) {
        window.history.pushState(null, document.title, window.location.href);

        confirmationFn.current = () => {
          router.push(backHref);
        };

        setLeavingPage(true);
      } else {
        router.back();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", handleClick);
    });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return (
    <>
      <LeavingDialog
        isOpen={leavingPage}
        noCallback={() => {
          setLeavingPage(false);
          confirmationFn.current = () => {};
        }}
        yesCallback={() => {
          confirmationFn.current();
          setLeavingPage(false);

          confirmationFn.current = () => {};
          resetData();
        }}
      />
    </>
  );
};

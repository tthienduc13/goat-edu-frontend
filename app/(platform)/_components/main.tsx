"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { Navbar } from "./navbar";

import Reloading from "@/components/reloading";
import { NoteOptionButton } from "@/components/note/note-control/note-option-button";
// import { ModalProvider } from "@/providers/modal-provider";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import { Onborda, OnbordaProvider } from "onborda";
import { steps } from "@/constants/steps";
import CustomCard from "@/components/custom/onboard-card";
import dynamic from "next/dynamic";

interface MainProps {
  children: React.ReactNode;
}

const DynamicModalProvider = dynamic(
  () => import("@/providers/modal-provider").then((res) => res.ModalProvider),
  {
    ssr: false,
  }
);

export const Main = ({ children }: MainProps) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const pathName = usePathname();

  const excludeNavbar = ["/onboarding"];

  const isExcludeNavbar = excludeNavbar.includes(pathName);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsloading(false);
    }, 1000);

    const minimumLoadingTime = 1000;
    const additionalTime = minimumLoadingTime - 1000;
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
      <OnbordaProvider>
        <Onborda steps={steps} shadowOpacity="0.8" cardComponent={CustomCard}>
          <div className="min-h-screen w-full h-full flex relative ">
            {!isExcludeNavbar && <Navbar />}
            <div
              className={cn(
                "z-5 p-10 w-full h-full mx-auto mt-16 max-w-[1440px] bg-inherit  transition-all duration-500 overflow-x-hidden flex"
              )}
            >
              {children}
              <DynamicModalProvider />
            </div>
            {!isExcludeNavbar && <NoteOptionButton />}
          </div>
        </Onborda>
      </OnbordaProvider>
    </>
  );
};

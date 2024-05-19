"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { Options } from "./options";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  backButtonColor: "default" | "white";
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonColor,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="flex mx-auto flex-wrap justify-center w-full px-6 max-w-[1200px] flex-grow">
      <Card className="flex bg-transparent border-none overflow-y-auto z-1 flex-col max-w-[480px] w-full h-full text-white">
        <CardHeader>
          <Header title={headerTitle} label={headerLabel} />
        </CardHeader>
        <CardContent className="flex flex-col mt-6 w-full gap-2 self-center place-items-center flex-1 pb-2 md:px-[60px] px-6">
          {showSocial && (
            <div className="pb-2  w-full  ">
              <Social />
              <Options label="Or" />
            </div>
          )}
          {children}
        </CardContent>
        <CardFooter className="flex flex-col w-full gap-2 self-center place-items-center flex-1 pb-2 md:px-[60px] px-6">
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
            color={backButtonColor}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { STAGGER_CHILD_VARIANTS } from "@/constants/onboarding";
import { Button } from "@/components/ui/button";
import { AtSign, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserAvatar } from "@/components/custom/user-avatar";
import { AvatarChanging } from "../../account/profile/_components/avatar-changing";

export const OnboardingUser = () => {
  const user = useCurrentUser();
  const router = useRouter();
  return (
    <motion.div
      className="flex flex-col gap-y-10 justify-center items-center"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        show: {
          opacity: 1,
          scale: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="flex flex-col items-center gap-y-5 text-center"
      >
        <h1>Choose a username</h1>
        <p>You can change your username and avatar any time in settings.</p>
      </motion.div>
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="flex max-w-md w-full items-center p-10  flex-col gap-y-8 "
      >
        <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
          <AtSign
            className={cn("h-5 w-5 mr-2 text-primary hover:text-white")}
          />
          <div className="flex flex-col">
            <div className="border-none px-3 outline-none text-primary shadow-none focus-visible:ring-0 ">
              {user?.username}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row items-center gap-x-5">
          <AvatarChanging page="onboarding" />
        </div>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS}>
        <Button
          onClick={() => router.push("/onboarding?page=command")}
          size={"lg"}
          className="text-base"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
};

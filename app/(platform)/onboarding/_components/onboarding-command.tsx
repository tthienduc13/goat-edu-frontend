"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { STAGGER_CHILD_VARIANTS } from "@/constants/onboarding";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";

export const OnboardingCommand = () => {
  const router = useRouter();
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        // e.preventDefault();
        setIsClick(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
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
        <h1>Command menu</h1>
        <p>Navigate between sets, folders and classes quickly.</p>
      </motion.div>
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="flex max-w-md w-full items-center p-10  flex-col gap-y-2 border-secondary border-[2px] rounded-md overflow-hidden"
      >
        <div className="text-muted-foreground">
          Try opening the command menu with:
        </div>
        <div className="flex flex-row gap-x-5">
          <motion.button className=" h-14 w-14 flex items-center justify-center rounded-md bg-secondary">
            <Command className="h-10 w-10" />
          </motion.button>
          <motion.button className="h-14 w-14 rounded-md bg-secondary">
            <div className="text-4xl">K</div>
          </motion.button>
        </div>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS}>
        <Button
          onClick={() => router.push("/onboarding?page=done")}
          disabled={!isClick}
          size={"lg"}
          className="text-base"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
};

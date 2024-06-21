"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { STAGGER_CHILD_VARIANTS } from "@/constants/onboarding";
import { Button, buttonVariants } from "@/components/ui/button";
import Logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const ghost = {
  transition: {
    repeat: Infinity,
    duration: 5,
    ease: "backInOut",
  },
  animate: {
    translateY: [0, -20, 0],
  },
};
export const OnboardingDone = () => {
  const router = useRouter();

  useEffect(() => {
    confetti({
      particleCount: 500,
      spread: 323,
      origin: { x: 0.5, y: 0.5 },
    });
  }, []);
  return (
    <motion.div
      className="z-10 "
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center gap-y-6"
      >
        <motion.div variants={STAGGER_CHILD_VARIANTS} {...ghost}>
          <Image src={Logo} alt="logo" width={150} height={150} />
        </motion.div>
        <motion.h1
          className=" flex flex-row gap-x-2 text-5xl"
          variants={STAGGER_CHILD_VARIANTS}
        >
          Great! You are all set 🎉
        </motion.h1>
        <motion.p
          className="max-w-2xl text-muted-foreground text-center transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          That&apos;s everything for now, you&apos;re ready to start using
          GoatEdu.
        </motion.p>
        <motion.div variants={STAGGER_CHILD_VARIANTS}>
          <Button
            onClick={() => router.push("/browse")}
            size={"lg"}
            className="text-base"
          >
            Done
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

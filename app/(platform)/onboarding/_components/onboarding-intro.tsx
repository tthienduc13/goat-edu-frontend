"use client";
import { useRouter } from "next/navigation";

import Logo from "@/public/logo.png";

import { motion } from "framer-motion";

import Image from "next/image";

import { STAGGER_CHILD_VARIANTS } from "@/constants/onboarding";
import { Button } from "@/components/ui/button";

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
export const OnboardingIntro = () => {
  const router = useRouter();
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
          Welcome to GoatEdu
        </motion.h1>
        <motion.p
          className="max-w-2xl text-muted-foreground text-center transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          GoatEdu offers professional site for all students around the world in
          general and students in Vietnam in specific to pass the National
          Highschool Exam.
        </motion.p>
        <motion.div variants={STAGGER_CHILD_VARIANTS}>
          <Button
            onClick={() => router.push("/onboarding?page=theme")}
            size={"lg"}
            className="text-base"
          >
            Get started
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

"use client";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { STAGGER_CHILD_VARIANTS } from "@/constants/onboarding";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { GraduationCap, LibraryBig } from "lucide-react";

type Role = "teacher" | "student";

export const OnboardingRole = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("student");
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
        <h1>Are you a student or a teacher?</h1>
        <p>You can change this later in settings.</p>
      </motion.div>
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="flex flex-row border-secondary border-[2px] rounded-md overflow-hidden"
      >
        <motion.button
          onClick={() => setSelectedRole("student")}
          className={cn(
            "p-10 rounded-none w-full flex dark:bg-[#a8b3cf14] flex-col justify-center items-center",
            buttonVariants({
              variant: selectedRole === "student" ? "secondary" : "ghost",
              size: "custom",
              className: "rounded-none",
            })
          )}
        >
          <div className="flex flex-row items-center">
            <LibraryBig className="w-5 h-5 mr-2" />
            <span className="text-base font-medium"> Student</span>
          </div>
        </motion.button>
        <motion.button
          onClick={() => setSelectedRole("teacher")}
          className={cn(
            "p-10 rounded-none w-full dark:bg-[#a8b3cf14] flex flex-col justify-center items-center",
            buttonVariants({
              variant: selectedRole === "teacher" ? "secondary" : "ghost",
              size: "custom",
              className: "rounded-none",
            })
          )}
        >
          <div className="flex flex-row items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            <span className="text-base font-medium"> Teacher</span>
          </div>
        </motion.button>
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

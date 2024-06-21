"use client";

import { motion } from "framer-motion";
import { STAGGER_CHILD_VARIANTS } from "@/constants/onboarding";
import SampleImage from "@/assets/sample2.png";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const OnboardingTheme = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  // if (!theme) return null;

  const variantLight = theme === "light" ? "secondary" : "ghost";
  const variantDark = theme === "dark" ? "secondary" : "ghost";

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
        <h1>Choose your theme</h1>
        <p>You can change this later in settings.</p>
      </motion.div>
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="flex flex-row border-secondary border-[2px] rounded-md overflow-hidden"
      >
        <motion.button
          onClick={() => setTheme("light")}
          className={cn(
            "p-5 rounded-none w-full flex flex-col justify-center items-center",
            buttonVariants({
              variant: variantLight,
              size: "custom",
              className: "rounded-none",
            })
          )}
        >
          <div className="flex max-w-sm w-full flex-col gap-y-2">
            <Image src={SampleImage} alt="light" width={200} height={100} />
            Light
          </div>
        </motion.button>
        <motion.button
          onClick={() => setTheme("dark")}
          className={cn(
            "p-5 rounded-none w-full flex flex-col justify-center items-center",
            buttonVariants({
              variant: variantDark,
              size: "custom",
              className: "rounded-none",
            })
          )}
        >
          <div className="flex max-w-sm w-full flex-col gap-y-2">
            <Image src={SampleImage} alt="dark" width={200} height={100} />
            Dark
          </div>
        </motion.button>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS}>
        <Button
          onClick={() => router.push("/onboarding?page=user")}
          size={"lg"}
          className="text-base"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
};

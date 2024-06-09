"use client";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Explore our range of tailored plans and find the perfect fit for your need. Whether you're interested in 1 month, 3 months or 6 months, we have the ideal solution crafted for you.`;

export const Introduction = () => {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-6xl"
      >
        Discover Your Ideal Plan
      </motion.h1>
      <div className="px-32">
        <TextGenerateEffect
          className="text-center text-muted-foreground"
          words={words}
        />
      </div>
    </LampContainer>
  );
};

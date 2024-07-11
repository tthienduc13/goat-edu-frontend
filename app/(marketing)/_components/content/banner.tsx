"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// import { Button } from "@/components/ui/button";

import { sampleArcs } from "@/data/globe-sample";
import { globeConfig } from "@/data/globe-config";

import { words } from "@/constants/banner-words";
import { Button } from "@/components/ui/enhanced-button";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

const TypeWriter = dynamic(
  () =>
    import("@/components/ui/typewriter-effect").then(
      (m) => m.TypewriterEffectSmooth
    ),
  {
    ssr: false,
  }
);

export function Banner() {
  return (
    <div className="h-[calc(100vh-64px)] w-full dark:bg-background bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-[1320px] w-full h-full flex items-center justify-center md:justify-between flex-col-reverse gap-y-5 sm:flex-row">
        <div className="xl:max-w-[700px] md:max-w-[400px] lg:max-w-[500px] w-full flex flex-col items-center">
          <h2 className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base ">
            The road to champion starts here
          </h2>
          <TypeWriter words={words} />
          <h2 className="text-neutral-600 text-center dark:text-neutral-200 text-sm sm:text-base ">
            GoatEdu is a premier educational platform dedicated to supporting
            students globally, with a special emphasis on students in Vietnam.
            Access professional courses, practice tests, and tailored resources
            designed to help you succeed in the National High School Exam and
            other academic challenges.
          </h2>
          <Link className="mt-4" href="/auth/login">
            <Button variant={"gooeyLeft"} className="rounded-xl">
              Join with us
            </Button>
          </Link>
        </div>
        <div className=" w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[600px] md:h-auto  md:flex flex-row items-center justify-center py-5 md:py-20 bg-transparent relative">
          <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[600px] w-full">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}

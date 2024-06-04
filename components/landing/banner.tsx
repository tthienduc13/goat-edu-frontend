"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

import { sampleArcs } from "@/data/globe-sample";
import { globeConfig } from "@/data/globe-config";

import { words } from "@/constants/banner-words";
import Link from "next/link";
import dynamic from "next/dynamic";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export function Banner() {
  return (
    <div className="h-[calc(100vh-64px)] w-full dark:bg-background bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-[1320px] w-full h-full flex items-center justify-between flex-row">
        <div className="max-w-[700px] w-full flex flex-col items-center">
          <div className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base ">
            The road to champion starts here
          </div>
          <TypewriterEffectSmooth words={words} />
          <Button>
            <Link href="/auth/login"> Join with us</Link>
          </Button>
        </div>
        <div className=" w-[600px] hidden md:flex flex-row items-center justify-center py-20 h-screen md:h-auto bg-transparent relative">
          <div className=" w-full h-[600px] ">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}

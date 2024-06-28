import React from "react";
import { Meteors } from "@/components/ui/meteors";
import { Flashcard } from "@/types/flashcard";
import { flashcardContent } from "@/queries/flashcard-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardProps {
  data: Flashcard;
}

export function Card({ data }: CardProps) {
  return (
    <div className="">
      <div className=" w-full relative max-w-lg">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r dark:from-blue-500 from-blue-500/30 dark:to-teal-500 to-teal-500/30 transform scale-[0.80] dark:bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-background border  dark:border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <Link href={`flashcards/${data.id}`}>
            <h1 className="font-bold text-xl  mb-4 relative z-50">
              {data.flashcardName}
            </h1>
          </Link>
          <Link href={`flashcards/${data.id}`}>
            <p className=" line-clamp-2 text- mb-4 overflow-hidden font-medium text-sm text-slate-500 relative z-50">
              {data.flashcardDescription}
            </p>
          </Link>
          <div className="w-full justify-between items-center flex">
            <div className="text-muted-foreground text-sm px-2 py-1 rounded-lg bg-secondary">
              {data.numberOfFlashcardContent} {""}{" "}
              {data.numberOfFlashcardContent > 1 ? "terms" : "term"}
            </div>
            <Link href={`flashcards/${data.id}`}>
              <Button className="border px-4 py-1 rounded-lg ">Explore</Button>
            </Link>
          </div>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}

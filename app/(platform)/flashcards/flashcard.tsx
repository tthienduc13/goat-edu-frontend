"use client";

import { useQuery } from "@tanstack/react-query";

import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";

import { useEffect, useRef, useState } from "react";
import { useOnborda } from "onborda";
import { useUserRate } from "@/app/api/rate/rate.query";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Globe,
  Layers,
  Pencil,
  Settings,
  Shuffle,
  Trash,
} from "lucide-react";
import { Star } from "./[slug]/_components/star-rating";
import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import FlashcardArrayProps from "react-quizlet-flashcard/dist/interfaces/IFlashcardArray";
import { ArrayFlashcard } from "./[slug]/_components/array-flashcard";
import { FlashcardContent } from "@/types/flashcard";
import { SettingButton } from "./[slug]/_components/control/setting-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Terms } from "./[slug]/_components/terms";
import { Options } from "./[slug]/_components/options";
interface FlashcardProps {
  token: string;
  id: string;
}

const shuffleArray = (array: FlashcardContent[]) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const Flashcard = ({ token, id }: FlashcardProps) => {
  const [shuffledData, setShuffledData] = useState<FlashcardContent[]>([]);
  //   const { startOnborda } = useOnborda();
  //   const handleStartOnboarda = () => {
  //     startOnborda();
  //   };

  const {
    data: flashcardContentData,
    isLoading: flashcardContentLoading,
    error: flashcardContentError,
  } = useQuery(useFlashcardContentById({ token: token, id: id }));

  const {
    data: flashcardData,
    isLoading: flashcardLoading,
    error: flashcardError,
  } = useQuery(useFlashcardById({ token: token, id: id }));

  const { data: isRate } = useQuery(useUserRate({ token: token, id: id }));

  useEffect(() => {
    if (flashcardContentData) {
      setShuffledData(flashcardContentData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShuffle = () => {
    setShuffledData(shuffleArray(shuffledData));
    // setCurrentIndex(0);
    // setProgress(0);
    // setIsFlipped(false);
  };
  console.log(shuffledData);

  // useEffect(() => {
  //   if (!localStorage.getItem("firstVisited")) {
  //     handleStartOnboarda();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (flashcardContentLoading || flashcardLoading) {
    return;
  }

  if (!flashcardContentData || !flashcardData || shuffledData.length === 0) {
    return;
  }
  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-y-10 w-full h-full">
      <div className="flex flex-col gap-y-5 w-full">
        <h1 className="px-2 py-1 bg-secondary w-fit text-sm font-semibold rounded-xl ">
          {flashcardData?.subjectName}
        </h1>
        <div className="text-3xl font-bold">{flashcardData?.flashcardName}</div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center text-muted-foreground text-sm font-medium h-5 gap-x-2">
            <div className="flex flex-row items-center gap-x-1">
              <Globe className="h-4 w-4" />
              {flashcardData?.status}
            </div>
            <Separator orientation="vertical" />
            <div>
              {flashcardContentData.length} {""}{" "}
              {flashcardContentData.length > 1 ? "terms" : "term"}
            </div>
          </div>
          {/* TODO: ADD CHECK IF USER'S FLASHCARD */}
          <div className="flex flex-row items-center gap-x-2">
            <Star id={id} />
            <div className="text-base">{flashcardData?.star}</div>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Hint label="Edit">
              <Button variant={"secondary"} size={"icon"}>
                <Pencil className="h-4 w-4" />
              </Button>
            </Hint>
            <Hint label="Delete">
              <Button variant={"secondary"} size={"icon"}>
                <Trash className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-8">
        <div className="flex flex-row gap-5">
          <div className="flex w-[160px] flex-col gap-y-4">
            <Options />
          </div>
          <div className="w-[1000px] ">
            <ArrayFlashcard data={shuffledData} />
          </div>
          <div className=" flex flex-col gap-y-4">
            <Button size={"lg"} variant={"outline"}>
              <Shuffle className="w-5 h-5 mr-2" />
              <div className="text-base">Shuffle</div>
            </Button>
            <SettingButton />
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-row items-center gap-x-2">
            <div className="h-12 w-12">
              <Avatar>
                <AvatarImage src={flashcardData.userImage} />
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col ">
              <div className="text-sm font-semibold">
                {flashcardData.fullName}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Last update:{" "}
                {new Date(flashcardData.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            {flashcardData.flashcardDescription}
          </div>
        </div>
      </div>
      <Terms
        termsCount={flashcardData.numberOfFlashcardContent}
        data={flashcardContentData}
      />
    </div>
  );
};

"use client";

import { useQuery } from "@tanstack/react-query";

import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";

import { useEffect, useState } from "react";
import { useOnborda } from "onborda";

import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrayFlashcard } from "./[slug]/_components/array-flashcard/array-flashcard";
import { FlashcardContent } from "@/types/flashcard";
import { SettingButton } from "./[slug]/_components/control/setting-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Terms } from "./[slug]/_components/terms";
import { Options } from "./[slug]/_components/array-flashcard/options";
import { FlashcardHeader } from "./[slug]/_components/flashcard-header/flashcard-header";
import { FlashcardHeaderLoading } from "./[slug]/_components/flashcard-header/flashcard-header-loading";
import { FlashcardContentLoading } from "./[slug]/_components/flashcard-content-loading";
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
  const { startOnborda } = useOnborda();
  const handleStartOnboarda = () => {
    startOnborda();
  };

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

  useEffect(() => {
    if (flashcardContentData) {
      setShuffledData(flashcardContentData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShuffle = () => {
    setShuffledData(shuffleArray(shuffledData));
  };

  useEffect(() => {
    if (!localStorage.getItem("firstVisited")) {
      handleStartOnboarda();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "s") {
  //       e.preventDefault();
  //       handleShuffle();
  //     }
  //   };
  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // TODO: ADD Reset flashcard

  if (!flashcardContentData || !flashcardData || shuffledData.length === 0) {
    return;
  }
  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-y-10 w-full h-full">
      {flashcardLoading ? (
        <FlashcardHeaderLoading />
      ) : (
        <FlashcardHeader
          id={id}
          data={flashcardData}
          termsCount={flashcardContentData.length}
        />
      )}
      <div className="w-full flex flex-col  gap-y-8">
        {flashcardContentLoading ? (
          <FlashcardContentLoading />
        ) : (
          <div className="flex flex-row gap-5">
            <Options id={id} />
            <div className="w-[1000px] h-[500px] ">
              <ArrayFlashcard data={shuffledData} />
            </div>
            <div className=" flex flex-col gap-y-4">
              <Button
                id="onborda-step4"
                onClick={handleShuffle}
                size={"lg"}
                variant={"outline"}
              >
                <Shuffle className="w-5 h-5 mr-2" />
                <div className="text-base">Shuffle</div>
              </Button>
              <SettingButton />
            </div>
          </div>
        )}
        {!flashcardContentLoading && (
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
        )}
      </div>
      {!flashcardContentLoading && (
        <Terms
          termsCount={flashcardData.numberOfFlashcardContent}
          data={flashcardContentData}
        />
      )}
    </div>
  );
};

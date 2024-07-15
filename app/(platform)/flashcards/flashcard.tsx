"use client";

import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useOnborda } from "onborda";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrayFlashcard } from "./[slug]/_components/array-flashcard/array-flashcard";
import { FlashcardContent } from "@/types/flashcard";
import { SettingButton } from "./[slug]/_components/control/setting-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Terms } from "./[slug]/_components/terms/terms";
import { Options } from "./[slug]/_components/array-flashcard/options";
import { FlashcardHeader } from "./[slug]/_components/flashcard-header/flashcard-header";
import { FlashcardHeaderLoading } from "./[slug]/_components/flashcard-header/flashcard-header-loading";
import { FlashcardContentLoading } from "./[slug]/_components/flashcard-content-loading";
import { useFlashcardContentById } from "@/app/api/flashcard-content/flashcard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";
import Error from "@/app/error";
import { useCurrentUser } from "@/hooks/use-current-user";
import { EmtpyFlashcardContent } from "./[slug]/_components/empty-flashcard-content";

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
  const user = useCurrentUser();
  const [shuffledData, setShuffledData] = useState<FlashcardContent[]>([]);
  const { startOnborda } = useOnborda();
  const handleStartOnboarda = () => {
    startOnborda();
  };

  const queriesResult = useQueries({
    queries: [
      useFlashcardById({ token: token, id: id }),
      useFlashcardContentById({ token: token, id: id }),
    ],
  });

  const isLoading = queriesResult.some((query) => query.isLoading);
  const isError = queriesResult.some((query) => query.error);

  useEffect(() => {
    if (queriesResult[1].data) {
      setShuffledData(queriesResult[1].data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queriesResult[1].data]);

  const handleShuffle = () => {
    const newShuffledData = shuffleArray(shuffledData);
    setShuffledData(newShuffledData);
  };

  useEffect(() => {
    if (!localStorage.getItem("firstVisited")) {
      handleStartOnboarda();
      localStorage.setItem("firstVisited", "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "h" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleShuffle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledData]);

  if (isLoading) {
    return (
      <div className="max-w-[1300px] mx-auto flex flex-col gap-y-10 w-full h-full">
        <FlashcardHeaderLoading />
        <FlashcardContentLoading />
      </div>
    );
  }

  if (isError) {
    Error();
  }

  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-y-10 w-full h-full">
      <FlashcardHeader
        id={id}
        data={queriesResult[0].data}
        termsCount={queriesResult[1].data?.length}
      />
      {shuffledData.length !== 0 ? (
        <div className="w-full flex flex-col gap-y-8">
          <div className="flex flex-row gap-5">
            <Options id={id} />
            <div className="w-[1000px] h-[500px]">
              <ArrayFlashcard data={shuffledData} />
            </div>
            <div className="flex flex-col gap-y-4">
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
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-row items-center gap-x-2">
              <div className="h-12 w-12">
                <Avatar>
                  <AvatarImage src={queriesResult[0].data?.userImage} />
                  <AvatarFallback>GE</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold">
                  {queriesResult[0].data?.fullName}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Last update:{" "}
                  {new Date(
                    queriesResult[0].data?.updatedAt!
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">
              {queriesResult[0].data?.flashcardDescription}
            </div>
          </div>
        </div>
      ) : (
        <EmtpyFlashcardContent />
      )}
      {shuffledData.length !== 0 && (
        <Terms
          termsCount={shuffledData.length}
          data={queriesResult[1].data}
          isOwner={queriesResult[0].data?.userId === user?.id}
          flashcardId={id}
        />
      )}
    </div>
  );
};

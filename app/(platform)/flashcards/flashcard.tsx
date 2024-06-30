"use client";

import { useQuery } from "@tanstack/react-query";

import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";

import { Card } from "./[slug]/_components/card";
import { Terms } from "./[slug]/_components/terms";
import { Wrapper } from "./[slug]/_components/wrapper";
import { useEffect } from "react";
import { useOnborda } from "onborda";
import { useUserRate } from "@/app/api/rate/rate.query";

interface FlashcardProps {
  token: string;
  id: string;
}

export const Flashcard = ({ token, id }: FlashcardProps) => {
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

  const { data: isRate } = useQuery(useUserRate({ token: token, id: id }));

  useEffect(() => {
    if (!localStorage.getItem("firstVisited")) {
      handleStartOnboarda();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (flashcardContentLoading) {
    return;
  }

  if (!flashcardContentData) {
    return;
  }
  return (
    <>
      <Wrapper
        headerTitle={flashcardData?.flashcardName!}
        headerDes={flashcardData?.flashcardDescription!}
        headerStar={flashcardData?.star!}
        flashcardId={id}
        isRated={isRate}
        withStar
      >
        <div className="max-w-[1000px]  bg-background mx-auto flex flex-col gap-y-10">
          <Card
            flashcardName={flashcardData?.flashcardName!}
            data={flashcardContentData}
          />
          <Terms data={flashcardContentData} />
        </div>
      </Wrapper>
    </>
  );
};

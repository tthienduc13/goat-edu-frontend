"use client";

import { useQuery } from "@tanstack/react-query";

import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";

import { Card } from "./[slug]/_components/card";
import { Terms } from "./[slug]/_components/terms";
import { Wrapper } from "./[slug]/_components/wrapper";

interface FlashcardProps {
  token: string;
  id: string;
}

export const Flashcard = ({ token, id }: FlashcardProps) => {
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

  if (flashcardContentLoading) {
    return;
  }

  if (!flashcardContentData) {
    return;
  }
  return (
    <Wrapper
      headerTitle={flashcardData?.flashcardName!}
      headerDes={flashcardData?.flashcardDescription!}
      headerStar={flashcardData?.star!}
    >
      <div className="max-w-[900px] mx-auto flex flex-col gap-y-10">
        <Card data={flashcardContentData} />
        <Terms data={flashcardContentData} />
      </div>
    </Wrapper>
  );
};

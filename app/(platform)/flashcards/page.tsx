"use client";

import { useFlashcards } from "@/app/api/flashcard/flashcard.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "./_components/card";

const FlashcardsPage = () => {
  const user = useCurrentUser();
  const {
    data: flashcardsData,
    isLoading: flashcardsLoading,
    error: flascardsError,
  } = useFlashcards(1, user?.token!);
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {flashcardsData?.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};

export default FlashcardsPage;

"use client";

import { useFlashcards } from "@/app/api/flashcard/flashcard.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

const FlashcardsPage = () => {
  const user = useCurrentUser();
  const {
    data: flashcardsData,
    isLoading: flashcardsLoading,
    error: flascardsError,
  } = useFlashcards(1, user?.token!);
  return (
    <>
      <div className="flex flex-col gap-y-5">
        {flashcardsData?.map((data) => (
          <div key={data.id}>
            <Link href={`/flashcards/${data.id}`}>{data.flashcardName}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlashcardsPage;

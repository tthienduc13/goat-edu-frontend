"use client";

import {
  useDiscussions,
  useSearchDiscussion,
} from "@/app/api/discussion/discussion.query";
import { useSearchFlashcard } from "@/app/api/flashcard/flashcard.query";
import { useSearchSubject, useSubjects } from "@/app/api/subject/subject.query";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Status as DiscussionStatus } from "@/types/discussion";
import { Status as FlashcardStatus } from "@/types/flashcard";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";

export const SearchInput = () => {
  const user = useCurrentUser();
  const [inputValue, setInputValue] = useState<string>("");
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const queriesResult = useQueries({
    queries: [
      useSearchDiscussion({
        token: user?.token!,
        search: inputValue,
        pageNumber: 1,
        pageSize: 3,
        status: DiscussionStatus.Approved,
      }),
      useSearchFlashcard({
        token: user?.token!,
        search: inputValue,
        pageNumber: 1,
        pageSize: 3,
        status: FlashcardStatus.Open,
      }),
      useSearchSubject({
        token: user?.token!,
        search: inputValue,
        pageNumber: 1,
        pageSize: 3,
      }),
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="relative h-10 w-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        queriesResult={queriesResult}
      />
    </div>
  );
};

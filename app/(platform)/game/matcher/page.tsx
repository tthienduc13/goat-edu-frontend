"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface Match {
  flashcardContentQuestion: string;
  flashcardContentAnswer: string;
}

// TODO: get this data from the backend
const flashcards = [
  {
    flashcardContentQuestion: "What is the atomic number of Hydrogen?",
    flashcardContentAnswer: "1",
  },
  {
    flashcardContentQuestion: "Who discovered the theory of relativity?",
    flashcardContentAnswer: "Albert Einstein",
  },
  {
    flashcardContentQuestion: "What is the unit of electric current?",
    flashcardContentAnswer: "Ampere",
  },
  {
    flashcardContentQuestion: "What is the largest organ in the human body?",
    flashcardContentAnswer: "Skin",
  },
  {
    flashcardContentQuestion: "What is the chemical symbol for gold?",
    flashcardContentAnswer: "Au",
  },
  {
    flashcardContentQuestion: "What is the speed of light in a vacuum?",
    flashcardContentAnswer: "299,792,458 meters per second",
  },
];

export default function FlashcardMatcher() {
  const [shuffledData, setShuffledData] = useState<string[]>([]);
  const [chosenIndices, setChosenIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const questionArray = flashcards.map(
      (data) => data.flashcardContentQuestion
    );
    const answerArray = flashcards.map((data) => data.flashcardContentAnswer);
    const prematchData = [...questionArray, ...answerArray];
    const shuffled = shuffleArray(prematchData);

    setShuffledData(shuffled);
  }, []);

  const handleChoose = (index: number) => {
    if (!chosenIndices.includes(index) && chosenIndices.length < 2) {
      setChosenIndices([...chosenIndices, index]);
    }
  };

  useEffect(() => {
    const checkForMatch = () => {
      if (chosenIndices.length === 2) {
        const [firstIndex, secondIndex] = chosenIndices;
        const firstFlashcard = flashcards[firstIndex];
        const secondFlashcard = flashcards[secondIndex];

        if (
          firstFlashcard.flashcardContentAnswer ===
          secondFlashcard.flashcardContentAnswer
        ) {
          setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
        }

        setChosenIndices([]);
      }
    };

    if (chosenIndices.length === 2) {
      checkForMatch();
    }
  }, [shuffleArray, chosenIndices, matchedIndices]);

  return (
    <div className="w-full h-full ">
      <div className="max-w-[1440px] grid grid-cols-4 gap-5 mx-auto ">
        {shuffledData.map((data, index) => (
          <div
            onClick={() => handleChoose(index)}
            key={index}
            className={cn(
              "flex justify-center px-4 text-xl text-center overflow-y-scroll items-center w-full h-[200px] rounded-lg  border-[2px] hover:bg-secondary",
              chosenIndices.includes(index) && "bg-violet-50 border-violet-500"
            )}
          >
            {data}
          </div>
        ))}
      </div>
    </div>
  );
}

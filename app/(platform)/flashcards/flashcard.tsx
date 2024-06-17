"use client";

import { Tour } from "antd";
import type { TourProps } from "antd";

import { useQuery } from "@tanstack/react-query";

import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";

import { Card } from "./[slug]/_components/card";
import { Terms } from "./[slug]/_components/terms";
import { Wrapper } from "./[slug]/_components/wrapper";
import { useEffect, useRef, useState } from "react";

interface FlashcardProps {
  token: string;
  id: string;
}

export const Flashcard = ({ token, id }: FlashcardProps) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const starRef = useRef(null);
  const flashcardRef = useRef(null);
  const shuffelRef = useRef(null);
  const previousRef = useRef(null);
  const counterRef = useRef(null);
  const nextRef = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "Title",
      description: "Flashcard title here",

      target: () => titleRef.current,
    },
    {
      title: "Description",
      description: "Flashcard description right here",
      target: () => descriptionRef.current,
    },
    {
      title: "Stars",
      description: "Star the flashcard for later look",
      target: () => starRef.current,
    },
    {
      title: "Flashcard",
      description:
        "Flashcard is here, click on it to flip card or use hot keys",
      target: () => flashcardRef.current,
    },
    {
      title: "Shuffle",
      description: "Click to shuffle the orders",
      target: () => shuffelRef.current,
    },
    {
      title: "Previous",
      description: "Move back card",
      target: () => previousRef.current,
    },
    {
      title: "Counter",
      description: "Count for current card and total",
      target: () => counterRef.current,
    },
    {
      title: "Next",
      description: "Move forward card",
      target: () => nextRef.current,
    },
    {
      title: "Finish",
      description: "Enjoy studying at GoatEdu",
      target: null,
    },
  ];

  const [isOpenTour, setIsOpenTour] = useState<boolean>(false);

  const handleStartTour = () => {
    setIsOpenTour(true);
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
    if (!localStorage.getItem("firstVisited")) {
      handleStartTour();
      // localStorage.setItem("firstVisited", "true");
    }
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
        titleRef={titleRef}
        headerDes={flashcardData?.flashcardDescription!}
        descriptionRef={descriptionRef}
        headerStar={flashcardData?.star!}
        starRef={starRef}
      >
        <div className="max-w-[900px]  bg-background mx-auto flex flex-col gap-y-10">
          <Card
            flashcardName={flashcardData?.flashcardName!}
            data={flashcardContentData}
            flashcardRef={flashcardRef}
            shuffleRef={shuffelRef}
            nextRef={nextRef}
            counterRef={counterRef}
            previousRef={previousRef}
          />
          <Terms data={flashcardContentData} />
        </div>
      </Wrapper>
      <Tour
        open={isOpenTour}
        onClose={() => {
          setIsOpenTour(false);
          localStorage.setItem("firstVisited", "true");
        }}
        type="primary"
        steps={steps}
      />
    </>
  );
};

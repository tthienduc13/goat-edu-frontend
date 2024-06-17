"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  Maximize,
  Minimize,
  Settings,
  Shuffle,
  X,
} from "lucide-react";
import { Hint } from "@/components/custom/hint";
import { SettingButton } from "./control/setting-button";
import { FlashcardContent } from "@/types/flashcard";
import Fullscreen from "react-fullscreen-crossbrowser";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/custom/logo";

interface CardProps {
  data: FlashcardContent[];
  flashcardName: string;
  shuffleRef: MutableRefObject<null>;
  nextRef: MutableRefObject<null>;
  counterRef: MutableRefObject<null>;
  previousRef: MutableRefObject<null>;
  flashcardRef: MutableRefObject<null>;
}

export const Card = ({
  data,
  flashcardName,
  shuffleRef,
  nextRef,
  counterRef,
  previousRef,
  flashcardRef,
}: CardProps) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [shuffledData, setShuffledData] = useState<FlashcardContent[]>(data);

  const total = shuffledData.length;
  const currentCard = shuffledData[currentIndex];
  const [cardBack, setCardBack] = useState(currentCard.flashcardContentAnswer);

  useEffect(() => {
    setTimeout(() => {
      setCardBack(currentCard.flashcardContentAnswer);
    }, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const shuffleArray = (array: FlashcardContent[]) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleShuffle = () => {
    setShuffledData(shuffleArray(shuffledData));
    setCurrentIndex(0);
    setProgress(0);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped((prev) => !prev);
    }
  };

  const handleNext = () => {
    if (currentIndex === total - 2 || currentIndex > total - 2) {
      setCurrentIndex(total - 1);
      setProgress(100);
    } else if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress((prev) => prev + 100 / (total - 1));
    }
    if (currentIndex !== total - 1) {
      setIsFlipped(false);
    }
  };

  const handleBack = () => {
    if (currentIndex === 1 || currentIndex < 1) {
      setCurrentIndex(0);
      setProgress(0);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress((prev) => prev - 100 / (total - 1));
    }
    if (currentIndex !== 0) {
      setIsFlipped(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handleBack();
          break;
        case "ArrowUp":
          event.preventDefault();
          handleFlip();
          break;
        case "ArrowDown":
          event.preventDefault();
          handleFlip();
          break;
        case " ":
          event.preventDefault();
          handleFlip();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <Fullscreen enabled={isFullScreen}>
      <div className="max-w-screen h-full flex justify-center  items-center">
        {isFullScreen && (
          <div className=" fixed top-0 left-0 w-full">
            <div className="h-16 p-4 flex items-center">
              <Logo size="lg" href="/browse" />
              <div className="flex-1 flex flex-col w-full  items-center justify-end">
                <div className="font-bold text-sm">
                  {currentIndex + 1} / {data.length}
                </div>
                <div className="text-sm font-bold">{flashcardName}</div>
              </div>
              <div className="w-[107px]  flex justify-end">
                <Hint label="Back to flashcards" side="bottom" sideOffset={10}>
                  <Button
                    onClick={handleFullScreen}
                    variant="ghost"
                    size="icon"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </Hint>
              </div>
            </div>
            <div className="bg-secondary h-1 w-full rounded-2xl">
              <div
                className="h-full bg-violet-500 rounded-2xl custom-transition"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col max-w-[1000px] w-full  items-center justify-center space-y-4">
          <div
            ref={flashcardRef}
            className={cn(
              "flip-card w-full ",
              isFullScreen ? "h-[600px]" : "h-[328px] sm:h-[428px]"
            )}
            onClick={handleFlip}
          >
            <motion.div
              className="flip-card-inner w-[100%] h-[100%] cursor-pointer"
              initial={false}
              animate={{ rotateX: isFlipped ? 180 : 360 }}
              transition={{
                duration: 0.1,
                type: "tween",
                animationDirection: "normal",
              }}
              onAnimationComplete={() => setIsAnimating(false)}
            >
              <div className="flip-card-front border-[2px] overflow-y-scroll shadow-lg w-[100%] h-[100%] rounded-lg p-4 flex justify-center items-center">
                <div className="text-3xl sm:text-4xl">
                  {currentCard.flashcardContentQuestion}
                </div>
              </div>
              <div className="flip-card-back  border-[2px] shadow-lg w-[100%] h-[100%]  rounded-lg p-4 flex justify-center items-center">
                <div className="text-3xl sm:text-4xl">{cardBack}</div>
              </div>
            </motion.div>
          </div>
          <div className="w-full h-full flex justify-center items-center font-semibold">
            <div className="flex flex-row items-center gap-x-2">
              <Hint label="Shuffle" side="bottom" sideOffset={10}>
                <Button
                  ref={shuffleRef}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={handleShuffle}
                >
                  <Shuffle className="h-5 w-5" />
                </Button>
              </Hint>
            </div>
            <div className="relative flex flex-1 justify-center items-center gap-28">
              <Button
                ref={previousRef}
                variant="ghost"
                size="icon"
                onClick={() => handleBack()}
                disabled={currentIndex === 0}
                className=" px-4 size-14 rounded-full custom-transition disabled:opacity-50"
              >
                <ChevronsLeft className="w-8 h-8" />
              </Button>
              {!isFullScreen && (
                <div ref={counterRef} className="absolute">
                  {currentIndex + 1} / {data.length}
                </div>
              )}
              <Button
                ref={nextRef}
                variant="ghost"
                size="icon"
                onClick={() => handleNext()}
                disabled={currentIndex === total - 1}
                className="px-4 size-14 rounded-full custom-transition disabled:opacity-50"
              >
                <ChevronsRight className="w-8 h-8" />
              </Button>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <SettingButton />
              <Hint
                label={isFullScreen ? "Exit full screen" : "Full screen"}
                side="bottom"
                sideOffset={10}
              >
                <Button
                  onClick={handleFullScreen}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  {isFullScreen ? (
                    <Minimize className="h-5 w-5" />
                  ) : (
                    <Maximize className="h-5 w-5" />
                  )}
                </Button>
              </Hint>
            </div>
          </div>

          {!isFullScreen && (
            <div className="bg-secondary h-1 w-full rounded-2xl">
              <div
                className="h-full bg-violet-500 rounded-2xl custom-transition"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </Fullscreen>
  );
};

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  Maximize,
  Settings,
  Shuffle,
} from "lucide-react";
import { Hint } from "@/components/custom/hint";
import { SettingButton } from "./control/setting-button";

// type FlashcardProps = {
//   cardData: Array<{ frontSide: string; backSide: string }>;
// };

const sampleCardData: Array<{ frontSide: string; backSide: string }> = [
  {
    frontSide: "What is the biggest contry",
    backSide: "Paris",
  },
  {
    frontSide: "What is the largest ocean in the world?",
    backSide: "Pacific Ocean",
  },
  {
    frontSide: 'Who is the author of "To Kill a Mockingbird"?',
    backSide: "Harper Lee",
  },
  {
    frontSide: "What is the formula for the area of a circle? adsfasdfasf",
    backSide: "A = π * r^2",
  },
  {
    frontSide: "What is the tallest mountain in the world?",
    backSide: "Mount Everest",
  },
];

const Flashcard = () =>
  // { cardData }: FlashcardProps
  {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const total = sampleCardData.length;
    const currentCard = sampleCardData[currentIndex];
    const [cardBack, setCardBack] = useState(currentCard.backSide);

    useEffect(() => {
      setTimeout(() => {
        setCardBack(currentCard.backSide);
      }, 150);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    // Flip card
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
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className="flip-card w-full h-[328px] sm:h-[428px]"
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
                {currentCard.frontSide}
              </div>
            </div>
            <div className="flip-card-back  border-[2px] shadow-lg w-[100%] h-[100%]  rounded-lg p-4 flex justify-center items-center">
              <div className="text-3xl sm:text-4xl">{currentCard.backSide}</div>
            </div>
          </motion.div>
        </div>
        <div className="w-full h-full flex justify-center items-center font-semibold">
          <div className="flex flex-row items-center gap-x-2">
            <Hint label="Shuffle" side="bottom" sideOffset={10}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Shuffle className="h-5 w-5" />
              </Button>
            </Hint>
          </div>
          <div className="relative flex flex-1 justify-center items-center gap-28">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleBack()}
              disabled={currentIndex === 0}
              className=" px-4 size-14 rounded-full custom-transition disabled:opacity-50"
            >
              <ChevronsLeft className="w-8 h-8" />
            </Button>
            <div className="absolute">
              {currentIndex + 1} / {sampleCardData.length}
            </div>
            <Button
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
            <Hint label="Full screen" side="bottom" sideOffset={10}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Maximize className="h-5 w-5" />
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
    );
  };

export default Flashcard;

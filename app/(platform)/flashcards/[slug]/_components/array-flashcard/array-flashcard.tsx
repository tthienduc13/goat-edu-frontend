import { FlashcardContent } from "@/types/flashcard";
import { useEffect, useRef, useState } from "react";
import FlashcardArray from "@/components/flash-card/flashcard-array/flashcard-array";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ControlRef {
  nextCard: () => void;
  prevCard: () => void;
  resetArray: () => void;
}

interface ArrayFlashcardProps {
  data?: FlashcardContent[];
}

// TODO: RESET FLASHCARD FUNCTION

export const ArrayFlashcard = ({ data }: ArrayFlashcardProps) => {
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const controlRef = useRef<ControlRef>({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });
  const currentCardFlipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          handleNextCard();
          break;
        case "ArrowLeft":
          handlePreviousCard();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case " ":
          event.preventDefault();
          handleFlipCard();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCardIndex]);

  useEffect(() => {
    // Focus on the window to ensure it captures key events
    window.focus();
  }, []);

  const handleReset = () => {
    if (controlRef.current) {
      controlRef.current.resetArray();
    }
  };

  const handleFlipCard = () => {
    if (currentCardFlipRef.current) {
      currentCardFlipRef.current();
    }
  };

  const handleNextCard = () => {
    if (controlRef.current && currentCardIndex < (data?.length ?? 1) - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setProgressWidth((prev) => prev + 100 / ((data?.length ?? 1) - 1));
      controlRef.current.nextCard();
    }
  };

  const handlePreviousCard = () => {
    if (controlRef.current && currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setProgressWidth((prev) => prev - 100 / ((data?.length ?? 1) - 1));
      controlRef.current.prevCard();
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="w-full h-full flex-col flex gap-y-4">
      <div
        id="onborda-step3"
        onClick={handleFlipCard}
        className="h-full w-full"
      >
        <FlashcardArray
          progressWidth={progressWidth}
          FlashcardArrayStyle={{
            width: "100%",
            height: "100%",
          }}
          frontCardStyle={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            height: "100%",
          }}
          frontContentStyle={{
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "500",
          }}
          backCardStyle={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            height: "100%",
          }}
          backContentStyle={{
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "500",
          }}
          cards={data}
          controls={false}
          showCount={false}
          forwardRef={controlRef}
          currentCardFlipRef={currentCardFlipRef}
        />
      </div>

      <div
        id="onborda-step5"
        className=" w-full flex justify-between items-center"
      >
        <Button
          onClick={handlePreviousCard}
          disabled={currentCardIndex === 0}
          size={"lg"}
          className="w-[40%]"
          variant={"secondary"}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-base font-bold">
          {currentCardIndex + 1} / {data.length}
        </div>
        <Button
          onClick={handleNextCard}
          disabled={currentCardIndex + 1 === data.length}
          size={"lg"}
          className="w-[40%]"
          variant={"secondary"}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

import { FlashcardContent } from "@/types/flashcard";
import { useEffect, useRef, useState } from "react";
// import { FlashcardArray } from "react-quizlet-flashcard";
import FlashcardArray from "@/components/flash-card/flashcard-array/flashcard-array";

interface ControlRef {
  nextCard: () => void;
  prevCard: () => void;
  resetArray: () => void;
}

interface ArrayFlashcardProps {
  data: FlashcardContent[];
}

export const ArrayFlashcard = ({ data }: ArrayFlashcardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const controlRef = useRef<ControlRef>({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });
  const currentCardFlipRef = useRef<() => void>(() => {});

  const handleNextCard = () => {
    if (controlRef.current) {
      controlRef.current.nextCard();
    }
  };
  const handlePreviousCard = () => {
    if (controlRef.current) {
      controlRef.current.prevCard();
    }
  };

  const handleFlipCard = () => {
    if (currentCardFlipRef.current) {
      currentCardFlipRef.current();
    }
  };

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
          event.preventDefault();
          handleFlipCard();
          break;
        case "ArrowDown":
          event.preventDefault();
          handleFlipCard();
          break;
        case " ":
          event.preventDefault();
          handleFlipCard();
          break;
        // case "Escape":
        //   event.preventDefault();
        //   setIsFullScreen(false);
        //   break;

        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCardIndex]);

  return (
    <div onClick={handleFlipCard}>
      <FlashcardArray
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
        onCardChange={(id, index) => {
          setCurrentCardIndex(index);
        }}
      />
    </div>
  );
};

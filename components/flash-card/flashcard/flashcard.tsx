import React, { useState } from "react";
import FlashcardProps from "../interface/IFlashcard";
import "./flashcard.scss";

function Flashcard({
  frontHTML,
  frontCardStyle,
  frontContentStyle,
  backHTML,
  backCardStyle,
  backContentStyle,
  className = "",
  style,
  height,
  borderRadius = "1rem",
  width,
  onCardFlip = (state = false) => {},
  manualFlipRef,
  progressWidth,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function onManualFlip() {
    setIsFlipped(!isFlipped);
    onCardFlip(!isFlipped);
  }

  // Ensure manualFlipRef.current is callable before assigning
  if (manualFlipRef && typeof manualFlipRef.current === "function") {
    manualFlipRef.current = onManualFlip;
  }

  return (
    <div
      className={`FlashcardWrapper ${className}`}
      style={{
        height: height,
        width: width,
        ...style,
      }}
    >
      <div
        className={`FlashcardWrapper__item ${
          isFlipped ? "FlashcardWrapper__item--flip" : ""
        }`}
        style={{
          borderRadius: borderRadius,
        }}
        onClick={() => {
          // Check if manualFlipRef.current is callable before flipping
          if (manualFlipRef && typeof manualFlipRef.current === "function") {
            manualFlipRef.current();
          } else {
            setIsFlipped(!isFlipped);
            onCardFlip(!isFlipped);
          }
        }}
      >
        <div
          className="FlashcardWrapper__item--front relative overflow-hidden"
          style={{
            ...frontCardStyle,
            cursor:
              manualFlipRef && typeof manualFlipRef.current === "function"
                ? "default"
                : "pointer",
          }}
        >
          {typeof frontHTML !== "string" ? (
            <div
              className="FlashcardWrapper__item--content"
              style={frontContentStyle}
            >
              {frontHTML}
            </div>
          ) : (
            <div
              className="FlashcardWrapper__item--content"
              dangerouslySetInnerHTML={{ __html: frontHTML }}
              style={frontContentStyle}
            />
          )}
          <div
            style={{ width: `${progressWidth}%` }}
            className="absolute w-full bottom-0 left-0 h-1 bg-violet-500 custom-transition"
          ></div>
        </div>
        <div
          className="FlashcardWrapper__item--back relative overflow-hidden"
          style={{
            ...backCardStyle,
            cursor:
              manualFlipRef && typeof manualFlipRef.current === "function"
                ? "default"
                : "pointer",
          }}
        >
          {typeof backHTML !== "string" ? (
            <div
              className="FlashcardWrapper__item--content"
              style={backContentStyle}
            >
              {backHTML}
            </div>
          ) : (
            <div
              className="FlashcardWrapper__item--content"
              dangerouslySetInnerHTML={{ __html: backHTML }}
              style={backContentStyle}
            />
          )}
          <div
            style={{ width: `${progressWidth}%` }}
            className="absolute w-full top-0 left-0 h-1 bg-violet-500 custom-transition"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;

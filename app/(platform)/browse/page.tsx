"use client";
import confetti from "canvas-confetti";

const BrowsePage = () => {
  return (
    <div className="h-screen w-full p-10">
      {/* <DynamicConfetti show={true} /> */}
      <button
        onClick={() =>
          confetti({
            particleCount: 500,
            spread: 323,
            origin: { x: 0.5, y: 0.5 },
          })
        }
      >
        click for confetti
      </button>
    </div>
  );
};

export default BrowsePage;

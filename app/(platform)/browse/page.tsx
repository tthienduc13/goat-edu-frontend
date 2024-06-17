"use client";
import DynamicConfetti from "@/components/custom/confetti/dynamic-confetti";

const BrowsePage = () => {
  return (
    <div className="h-screen w-full p-10">
      <DynamicConfetti show={false} />
    </div>
  );
};

export default BrowsePage;

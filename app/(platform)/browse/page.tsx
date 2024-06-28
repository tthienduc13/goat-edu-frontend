"use client";

import { Features } from "./_components/features";
import { PopularFlashcard } from "./_components/popular-flashcard";
import { RecentView } from "./_components/recent";

const BrowsePage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-12">
      <RecentView />
      <Features />
      <PopularFlashcard />
    </div>
  );
};

export default BrowsePage;

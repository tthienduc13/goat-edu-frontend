"use client";

import { Star } from "../flashcards/[slug]/_components/flashcard-header/star-rating";
import { AppFeatures } from "./_components/app-features";
import { EnrollCourses } from "./_components/enrolled-courses";
import { Footer } from "./_components/footer";
import { PopularDiscussion } from "./_components/popular-discussion";
import { PopularFlashcard } from "./_components/popular-flashcard";
import { RecentView } from "./_components/recent";

const BrowsePage = () => {
  return (
    <div className="w-full  flex flex-col gap-y-12">
      <RecentView />
      <EnrollCourses />
      <AppFeatures />
      <PopularFlashcard />
      <PopularDiscussion />
      <Footer />
    </div>
  );
};

export default BrowsePage;

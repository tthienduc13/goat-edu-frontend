"use client";

import { useQueries } from "@tanstack/react-query";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useUserEnroll } from "@/app/api/user/user.query";
import { useFlashcards } from "@/app/api/flashcard/flashcard.query";
import { useDiscussions } from "@/app/api/discussion/discussion.query";

import { RecentView } from "./_components/recent";
import { AppFeatures } from "./_components/app-features";
import { EnrollCourses } from "./_components/enrolled-courses";
import { PopularDiscussion } from "./_components/popular-discussion";
import { PopularFlashcard } from "./_components/popular-flashcard";
import { PageLoading } from "./_components/page-loading";
import { Footer } from "./_components/footer";

import { Status as FlashcardStatus } from "@/types/flashcard";
import { Status as DiscussionStatus } from "@/types/discussion";

import Error from "@/app/error";
import { useSession } from "next-auth/react";

const BrowsePage = () => {
  const user = useCurrentUser();
  const queriesResult = useQueries({
    queries: [
      useUserEnroll({ token: user?.token!, pageNumber: 1, pageSize: 3 }),
      useFlashcards({
        token: user?.token!,
        sort: "top",
        search: "",
        pageNumber: 1,
        pageSize: 3,
        status: FlashcardStatus.Open,
      }),
      useDiscussions({
        token: user?.token!,
        pageNumber: 1,
        pageSize: 3,
        sort: "top",
        search: "",
        status: DiscussionStatus.Approved,
      }),
    ],
  });

  const isError = queriesResult.some((query) => query.error);
  const isLoading = queriesResult.some((query) => query.isLoading);

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    Error();
  }

  return (
    <div className="w-full  flex flex-col gap-y-12">
      <RecentView data={queriesResult[1].data} />
      <EnrollCourses data={queriesResult[0].data} />
      <AppFeatures />
      <PopularFlashcard data={queriesResult[1].data} />
      <PopularDiscussion data={queriesResult[2].data} />
      <Footer />
    </div>
  );
};

export default BrowsePage;

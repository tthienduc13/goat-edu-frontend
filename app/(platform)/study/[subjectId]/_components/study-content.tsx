import Image from "next/image";
import { Header } from "./header";
import EmptyStudy from "@/public/icons/empty/empty-study.svg";
import { useSearchParams } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { useChapterById } from "@/app/api/chapter/chapter.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useLessonById } from "@/app/api/lesson/lesson.query";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicTheory = dynamic(
  () => import("./theory/lesson-theory").then((res) => res.LessonTheory),
  {
    ssr: false,
  }
);

const DynamicFlashcard = dynamic(
  () =>
    import("./flashcard/lesson-flashcard").then((res) => res.LessonFlashcard),
  {
    ssr: false,
  }
);

const DynamicQuiz = dynamic(
  () => import("./quiz/lesson-quiz").then((res) => res.LessonQuiz),
  {
    ssr: false,
  }
);

export const StudyContent = () => {
  const user = useCurrentUser();
  const searchParams = useSearchParams();

  const chapterId = searchParams.get("chapter");
  const lessonId = searchParams.get("lesson");
  const tab = searchParams.get("tab");

  const queriesResult = useQueries({
    queries: [
      useChapterById({ token: user?.token!, chapterId: chapterId! }),
      useLessonById({ token: user?.token!, lessonId: lessonId! }),
    ],
  });

  const isLoading = queriesResult.some((query) => query.isLoading);

  if (chapterId === null || lessonId === null) {
    return (
      <div className="w-[calc(70%-10px)] min-h-[calc(100vh-80px-64px)] flex flex-col gap-y-5 h-full">
        <div className="flex-1  h-full flex flex-col justify-center items-center">
          <div className="h-[300px] w-full relative">
            <Image src={EmptyStudy} alt="empty study" fill />
          </div>
          <h2 className="text-lg">Welcome! Start by choosing the lesson 😉</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[calc(70%-10px)] min-h-[calc(100vh-80px-64px)] flex flex-col gap-y-5 h-full">
      {queriesResult[0].data && queriesResult[1].data && (
        <Header
          isLoading={isLoading}
          chapterData={queriesResult[0].data!}
          lessonData={queriesResult[1].data!}
        />
      )}
      <div className="flex-1 h-full">
        {tab === "theory" && <DynamicTheory lessonId={lessonId} />}
        {tab === "flashcard" && <DynamicFlashcard lessonId={lessonId} />}
        {tab === "quiz" && <DynamicQuiz lessonId={lessonId} />}
      </div>
    </div>
  );
};

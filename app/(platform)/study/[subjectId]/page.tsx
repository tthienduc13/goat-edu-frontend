"use client";
import { useState } from "react";
import { useSubjectById } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import StudySideMenu from "../_components/side-menu";
import LessonQuiz from "../_components/quiz/lesson-quiz";
import LessonTheory from "../_components/theory/lesson-theory";
import LessonFlashCard from "../_components/theory-flashcard/lesson-flashcard";
import { useQuery } from "@tanstack/react-query";

interface StudyPageProps {
  params: { subjectId: string };
}

const SubjectStudyPage = ({ params }: StudyPageProps) => {
  const source = {
    theory: "Theory",
    theoryFlashcard: "TheoryFlashCard",
    quiz: "Quiz",
  };

  const user = useCurrentUser();
  const [display, setDisplay] = useState<string>("Theory");

  const { data, isLoading, error } = useQuery(
    useSubjectById({ token: user?.token!, id: params.subjectId })
  );
  const [sourceId, setSourceId] = useState<string>();
  const [sourceName, setsourceName] = useState<string>();

  const handleOnClick = (value: string, id: string, name: string) => {
    setDisplay(value);
    setSourceId(id);
    setsourceName(name);
  };

  return (
    <div className="w-full  flex">
      {display === source.theory &&
      sourceId !== undefined &&
      sourceName !== undefined ? (
        <LessonTheory
          lessonId={sourceId}
          lessonName={sourceName}
          token={user?.token as string}
        />
      ) : display === source.quiz &&
        sourceId !== undefined &&
        sourceName !== undefined ? (
        <LessonQuiz
          lessonId={sourceId}
          lessonName={sourceName}
          token={user?.token as string}
        />
      ) : display === source.theoryFlashcard &&
        sourceId !== undefined &&
        sourceName !== undefined ? (
        <LessonFlashCard
          lessonId={sourceId}
          lessonName={sourceName}
          token={user?.token as string}
        />
      ) : (
        ""
      )}
      <StudySideMenu
        chapters={data?.chapters}
        handleOnClick={handleOnClick}
        source={source}
        isLoading={isLoading}
      />
    </div>
  );
};
export default SubjectStudyPage;

"use client";
import { useEffect, useState } from "react";
import { useSubjectById } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LessonByChapter } from "@/types/lesson";
import { getLessonByChapter } from "@/app/api/lesson/lesson.api";
import StudySideMenu from "../_components/side-menu";
import LessonQuiz from "../_components/quiz/lesson-quiz";
import LessonTheory from "../_components/theory/lesson-theory";
import LessonFlashCard from "../_components/theory-flashcard/lesson-flashcard";

interface StudyPageProps {
  params: { subjectId: string };
}

const SubjectStudyPage = ({ params }: StudyPageProps) => {
  const source = {
    theory: "Theory",
    theoryFlashcard: "TheoryFlashCard",
    quiz: "Quiz",
  };
  const [lessonsByChapter, setLessonsByChapter] = useState<LessonByChapter[]>(
    []
  );

  const user = useCurrentUser();
  const [display, setDisplay] = useState<string>("Theory");

  const { data, isLoading, error } = useSubjectById(
    params.subjectId,
    user?.token as string
  );
  const [sourceId, setSourceId] = useState<string>("");
  const [sourceName, setsourceName] = useState<string>("");

  useEffect(() => {
    const fetchLessons = async () => {
      if (data?.chapters) {
        const lessonsPromises = data?.chapters.map((chapter) =>
          getLessonByChapter(chapter.id, user?.token as string, 100, 1)
        );

        const lessonsResults = await Promise.all(lessonsPromises);

        const mappedLessons = data?.chapters.map((chapter, index) => ({
          chapterid: chapter.id,
          lessonList: lessonsResults[index] || [],
          lessonCount: lessonsResults[index].length || 0,
        }));

        setLessonsByChapter(mappedLessons);
        setSourceId(mappedLessons[0].lessonList[0].id);
        setsourceName(mappedLessons[0].lessonList[0].lessonName);
      }
    };

    fetchLessons();
  }, [data?.chapters, user?.token]);

  const handleOnClick = (value: string, id: string, name: string) => {
    setDisplay(value);
    setSourceId(id);
    setsourceName(name);
  };
  return (
    <div className="w-full  flex">
      {display === source.theory ? (
        <LessonTheory
          lessonId={sourceId}
          lessonName={sourceName}
          token={user?.token as string}
        />
      ) : display === source.quiz ? (
        <LessonQuiz
          lessonId={sourceId}
          lessonName={sourceName}
          token={user?.token as string}
        />
      ) : (
        <LessonFlashCard
          lessonId={sourceId}
          lessonName={sourceName}
          token={user?.token as string}
        />
      )}
      <StudySideMenu
        chapters={data?.chapters}
        lessonsByChapter={lessonsByChapter}
        handleOnClick={handleOnClick}
        source={source}
        isLoading={isLoading}
      />
    </div>
  );
};
export default SubjectStudyPage;

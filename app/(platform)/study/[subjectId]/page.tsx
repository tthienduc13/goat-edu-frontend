"use client";
import { useEffect, useState } from "react";
import { useSubjectById } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LessonByChapter } from "@/types/lesson";
import { getLessonByChapter } from "@/app/api/lesson/lesson.api";
import StudySideMenu from "../_components/side-menu";
import LessonQuiz from "../_components/quiz/lesson-quiz";
import LessonTheory from "../_components/theory/lesson-theory";

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
  const [sourceId, setSourceId] = useState<string>("");
  const { data, isLoading, error } = useSubjectById(
    params.subjectId,
    user?.token as string
  );
  const [lessonsByChapter, setLessonsByChapter] = useState<LessonByChapter[]>(
    []
  );

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
      }
    };

    fetchLessons();
  }, [data?.chapters, user?.token]);

  const handleOnClick = (value: string, id: string) => {
    setDisplay(value);
    setSourceId(id);
  };
  return (
    <div className="w-full">
      <div className="w-full">
        {/* <LessonQuiz lessonName={"Lesson name"} /> */}
        {/* <LessonTheory /> */}
        {display === source.theory ? (
          <LessonTheory />
        ) : display === source.quiz ? (
          <LessonQuiz lessonId={sourceId} />
        ) : (
          "Flashcard"
        )}
      </div>
      <StudySideMenu
        chapters={data?.chapters}
        lessonsByChapter={lessonsByChapter}
        handleOnClick={handleOnClick}
        source={source}
      />
    </div>
  );
};
export default SubjectStudyPage;

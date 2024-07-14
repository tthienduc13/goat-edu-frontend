import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { useLessonByChapter } from "@/app/api/lesson/lesson.query";
import { useEffect } from "react";
import { Chapter } from "@/types/chapter";

interface SideLessonListProps {
  isFirstChapter: boolean;
  firstLessonSet: boolean;
  setFirstLessonSet: (value: boolean) => void;
  chapter: Chapter;
  chapterId: string;
  handleOnClick: (value: string, id: string, name: string) => void;
  source: {
    theory: string;
    theoryFlashcard: string;
    quiz: string;
  };
  isLoading: boolean;
}

const SideLessonList = ({
  isFirstChapter,
  firstLessonSet,
  setFirstLessonSet,
  chapter,
  isLoading,
  chapterId,
  handleOnClick,
  source,
}: SideLessonListProps) => {
  const user = useCurrentUser();
  const {
    data,
    isLoading: lessonLoading,
    error,
  } = useQuery(
    useLessonByChapter({
      token: user?.token!,
      chapterId: chapterId,
      pageNumber: 1,
      pageSize: 100,
      isLoading: isLoading,
    })
  );

  useEffect(() => {
    if (isFirstChapter && !firstLessonSet && data && data[0]) {
      handleOnClick(source.theory, data[0].id, data[0].lessonName);
      setFirstLessonSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (lessonLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading lessons</div>;
  }

  if (!data || data.length === 0) {
    return <div>No lessons found</div>;
  }

  return (
    <div>
      {data.map((lesson, index) => (
        <AccordionItem key={lesson.id} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            Lesson {lesson.displayOrder} : {lesson.lessonName}
          </AccordionTrigger>
          <AccordionContent>
            <Button
              onClick={() =>
                handleOnClick(source.theory, lesson.id, lesson.lessonName)
              }
              variant={"link"}
            >
              Theory
            </Button>
          </AccordionContent>
          <AccordionContent>
            <Button
              onClick={() =>
                handleOnClick(
                  source.theoryFlashcard,
                  lesson.id,
                  lesson.lessonName
                )
              }
              variant={"link"}
            >
              Flashcard
            </Button>
          </AccordionContent>
          <AccordionContent>
            <Button
              onClick={() =>
                handleOnClick(source.quiz, lesson.id, lesson.lessonName)
              }
              variant={"link"}
            >
              Quiz
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </div>
  );
};

export default SideLessonList;

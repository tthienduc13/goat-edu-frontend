import { useLessonByChapter } from "@/app/api/lesson/lesson.query";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Chapter } from "@/types/chapter";
import { useQuery } from "@tanstack/react-query";

interface ChapterListProps {
  chapter: Chapter;
  index: number;
}

export const ChapterList = ({ chapter, index }: ChapterListProps) => {
  const user = useCurrentUser();
  const { data, isLoading, error } = useQuery(
    useLessonByChapter({
      token: user?.token!,
      chapterId: chapter.id,
      pageNumber: 1,
      pageSize: 100,
      isLoading: false,
    })
  );
  return (
    <div className="mt-3">
      <AccordionItem value={`item-${index + 1}`}>
        <AccordionTrigger className=" px-2">
          <div className="flex flex-row w-full justify-between pr-4">
            <p>
              Chap {chapter.chapterLevel} : {chapter.chapterName}
            </p>
            <p> {data?.length} lessons </p>
          </div>
        </AccordionTrigger>
        {data?.length === 0 ? (
          <AccordionContent className="border-b-[0.8px]  pl-6 pt-4">
            No lesson
          </AccordionContent>
        ) : (
          data?.map((lesson) => (
            <AccordionContent
              key={lesson.id}
              className="border-b-[0.8px]  pl-6 pt-4"
            >
              Lesson {lesson.displayOrder + 1}: {lesson.lessonName}
            </AccordionContent>
          ))
        )}
      </AccordionItem>
    </div>
  );
};

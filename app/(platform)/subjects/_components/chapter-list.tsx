import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonByChapter } from "@/types/lesson";
import { Subject } from "@/types/subject";
import { Dispatch, SetStateAction } from "react";

interface ChapterListProps {
  data: Subject | undefined;
  openItems: string[];
  setOpenItems: Dispatch<SetStateAction<string[]>>;
  lessonsByChapter: LessonByChapter[];
}

export const ChapterList = ({
  data,
  openItems,
  setOpenItems,
  lessonsByChapter,
}: ChapterListProps) => {
  return (
    <div className="chapter-list mt-3">
      <Accordion
        className="space-y-3"
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
      >
        {data?.chapters.map((chapter, index) => {
          const thisChapterLesson = lessonsByChapter.find(
            (item) => item.chapterid === chapter.id
          );
          return (
            <AccordionItem key={chapter.id} value={`item-${index + 1}`}>
              <AccordionTrigger className=" px-2">
                <div className="flex flex-row w-full justify-between pr-4">
                  <p>
                    Chap {chapter.chapterLevel} : {chapter.chapterName}
                  </p>
                  <p> {thisChapterLesson?.lessonCount} lessons </p>
                </div>
              </AccordionTrigger>
              <div>
                {thisChapterLesson?.lessonList.map((lesson) => (
                  <AccordionContent
                    key={lesson.id}
                    className="border-b-[0.8px]  pl-6 pt-4"
                  >
                    {lesson.lessonName}
                  </AccordionContent>
                ))}
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

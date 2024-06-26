"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/chapter";
import { LessonByChapter } from "@/types/lesson";

interface StudySideMenuProps {
  chapters: Chapter[] | undefined;
  lessonsByChapter: LessonByChapter[];
}

const StudySideMenu = ({ chapters, lessonsByChapter }: StudySideMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      {chapters?.map((chapter) => {
        const thisChapterLesson = lessonsByChapter.find(
          (item) => item.chapterid === chapter.id
        );
        return (
          <SheetContent key={chapter.id} className="w-[600px]">
            <SheetHeader>
              <SheetTitle>
                Chapter {chapter.chapterLevel} : {chapter.chapterName}
              </SheetTitle>
            </SheetHeader>
            {thisChapterLesson?.lessonList.map((lesson) => (
              <Accordion
                key={lesson.id}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>{lesson.lessonName}</AccordionTrigger>
                  <AccordionContent>
                    <Button variant={"link"}>Theory</Button>
                  </AccordionContent>
                  <AccordionContent>
                    <Button variant={"link"}>Flashcard</Button>
                  </AccordionContent>
                  <AccordionContent>
                    <Button variant={"link"}>Quiz</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </SheetContent>
        );
      })}
    </Sheet>
  );
};
export default StudySideMenu;

"use client";

import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Chapter } from "@/types/chapter";
import { LessonByChapter } from "@/types/lesson";
import SideLessonList from "./side-lesson-list";

interface StudySideMenuProps {
  chapters: Chapter[] | undefined;
  lessonsByChapter: LessonByChapter[];
  handleOnClick: (value: string, id: string, name: string) => void;
  source: {
    theory: string;
    theoryFlashcard: string;
    quiz: string;
  };
  isLoading: boolean;
}

const StudySideMenu = ({
  chapters,
  lessonsByChapter,
  handleOnClick,
  source,
  isLoading,
}: StudySideMenuProps) => {
  if (isLoading) {
    return;
  }
  return (
    <div className="w-[400px] max-h-screen overflow-y-auto">
      {chapters?.map((chapter) => {
        const thisChapterLesson = lessonsByChapter.find(
          (item) => item.chapterid === chapter.id
        );
        return (
          <div key={chapter.id} className="w-full">
            <h4 className="font-bold">
              Chapter {chapter.chapterLevel} : {chapter.chapterName}
            </h4>
            {thisChapterLesson?.lessonList.map((lesson) => (
              <SideLessonList
                key={lesson.id}
                lesson={lesson}
                handleOnClick={handleOnClick}
                source={source}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default StudySideMenu;

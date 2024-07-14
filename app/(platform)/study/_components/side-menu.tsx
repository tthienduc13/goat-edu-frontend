"use client";

import { Chapter } from "@/types/chapter";
import SideLessonList from "./side-lesson-list";
import { Accordion } from "@/components/ui/accordion";
import { useState } from "react";

interface StudySideMenuProps {
  chapters: Chapter[] | undefined;
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
  handleOnClick,
  source,
  isLoading,
}: StudySideMenuProps) => {
  const [firstLessonSet, setFirstLessonSet] = useState(false);

  return (
    <div className="w-[400px] max-h-screen overflow-y-scroll">
      {chapters?.map((chapter, index) => {
        return (
          <div key={chapter.id} className="w-full">
            <h4 className="font-bold">
              Chapter {chapter.chapterLevel} : {chapter.chapterName}
            </h4>
            <Accordion
              key={chapter.id}
              type="single"
              collapsible
              className="w-full"
            >
              <SideLessonList
                isFirstChapter={index === 0}
                firstLessonSet={firstLessonSet}
                setFirstLessonSet={setFirstLessonSet}
                isLoading={isLoading}
                chapter={chapter}
                chapterId={chapter.id}
                handleOnClick={handleOnClick}
                source={source}
              />
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default StudySideMenu;

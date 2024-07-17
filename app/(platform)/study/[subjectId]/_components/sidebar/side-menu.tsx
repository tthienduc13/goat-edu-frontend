import { Accordion } from "@/components/ui/accordion";
import { Chapter } from "@/types/chapter";
import { SideLessonList } from "./side-lesson-list";

interface SideMenuProps {
  chaptersData: Chapter[];
}

export const SideMenu = ({ chaptersData }: SideMenuProps) => {
  return (
    <div className="w-[calc(30%-10px)] h-[calc(100vh-80px-64px)] overflow-y-scroll no-scrollbar border-[2px] shadow-lg p-4 rounded-lg flex flex-col gap-y-4 ">
      <h2 className="text-lg">Table content</h2>
      <div className="h-full gap-y-2 flex flex-col overflow-y-scroll">
        {chaptersData.map((chapter) => (
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
              <SideLessonList chapterId={chapter.id} />
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

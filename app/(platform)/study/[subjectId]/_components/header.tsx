import { notFound, useSearchParams } from "next/navigation";
import { Chapter } from "@/types/chapter";
import { Lesson } from "@/types/lesson";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/constants/study-tabs";

interface HeaderProps {
  chapterData: Chapter;
  lessonData: Lesson;
  isLoading: boolean;
}

export const Header = ({ chapterData, lessonData, isLoading }: HeaderProps) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  if (!Tabs.includes(tab!)) {
    notFound();
  }

  if (isLoading) {
    return <Skeleton className="w-full h-[68px]"></Skeleton>;
  }
  return (
    <div className="px-5 py-4 flex flex-col gap-y-1 rounded-lg border-[2px] shadow-lg">
      <h1 className="text-lg">
        Chapter {chapterData.chapterLevel}: {chapterData.chapterName}
      </h1>
      <div className="w-full flex flex-row items-center justify-between">
        <h3 className="text-sm">
          Lesson {lessonData.displayOrder}: {lessonData.lessonName}
        </h3>
        {tab && (
          <div className="px-4 py-2 text-sm rounded-lg bg-emerald-500/15 text-emerald-500">
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        )}
      </div>
    </div>
  );
};

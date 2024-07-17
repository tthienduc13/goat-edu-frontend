import { useLessonByChapter } from "@/app/api/lesson/lesson.query";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/enhanced-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/app/error";
import { Tabs } from "@/constants/study-tabs";

interface SideLessonListProps {
  chapterId: string;
}

export const SideLessonList = ({ chapterId }: SideLessonListProps) => {
  const user = useCurrentUser();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get("tab");

  const {
    data: lessonData,
    isLoading,
    error,
  } = useQuery(
    useLessonByChapter({
      token: user?.token!,
      chapterId: chapterId,
      pageSize: 100,
      pageNumber: 1,
      isLoading: true,
    })
  );

  if (isLoading) {
    return (
      <div className="w-full pl-4 mt-2 flex flex-col gap-y-2 ">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    );
  }

  if (error) {
    Error();
  }

  if (!lessonData || lessonData.length === 0) {
    return <div className="text-sm">No lessons found</div>;
  }

  const filterTabs = Tabs.filter((tab) => tab !== "welcome");
  return (
    <div>
      {lessonData?.map((lesson, index) => (
        <AccordionItem className="pl-4" key={lesson.id} value={`item-${index}`}>
          <AccordionTrigger className="text-start">
            Lesson {lesson.displayOrder} : {lesson.lessonName}
          </AccordionTrigger>
          {filterTabs.map((tab, index) => (
            <AccordionContent key={index} className="pb-0">
              <Button
                variant={"linkHover2"}
                className={cn(
                  "py-0",
                  currentTab === tab && "text-violet-500 underline"
                )}
                onClick={() => {
                  router.push(
                    `${pathname}?chapter=${chapterId}&lesson=${lesson.id}&tab=${tab}`
                  );
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </div>
  );
};

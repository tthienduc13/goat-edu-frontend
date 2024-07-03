import { Skeleton } from "@/components/ui/skeleton";

export const QuizLoading = () => {
  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto space-y-9">
        <Skeleton className="lesson-name h-[40px] w-full" />
        <div className="space-y-9">
          <Skeleton className="w-full h-[340px]" />
          <Skeleton className="w-full h-[340px]" />
          <Skeleton className="w-full h-[340px]" />
          <Skeleton className="w-full h-[340px]" />
          <Skeleton className="w-full h-[340px]" />
        </div>
      </div>
    </div>
  );
};

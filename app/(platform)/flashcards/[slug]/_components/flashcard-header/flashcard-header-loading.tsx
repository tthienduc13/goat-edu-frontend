import { Skeleton } from "@/components/ui/skeleton";

export const FlashcardHeaderLoading = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <Skeleton className="w-[100px] h-7" />
      <div className="flex flex-col gap-y-1">
        <Skeleton className="h-[68px] w-[400px]" />
        <Skeleton className="w-9 h-6" />
      </div>
      <Skeleton className="h-5 w-[100px]" />
    </div>
  );
};

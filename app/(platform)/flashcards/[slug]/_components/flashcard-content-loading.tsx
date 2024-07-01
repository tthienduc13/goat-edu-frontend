import { Skeleton } from "@/components/ui/skeleton";

export const FlashcardContentLoading = () => {
  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-y-5 max-w-[160px] w-full">
        <Skeleton className="w-full h-[60px]" />
        <Skeleton className="w-full h-[60px]" />
        <Skeleton className="w-full h-[60px]" />
        <Skeleton className="w-full h-[60px]" />
      </div>
      <Skeleton className="max-w-[1000px] w-full max-h-[500px] h-full " />
      <div className="flex flex-col max-w-[160px] w-full gap-y-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
};

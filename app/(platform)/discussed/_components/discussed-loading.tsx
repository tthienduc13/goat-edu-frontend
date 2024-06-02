import { Skeleton } from "@/components/ui/skeleton";

export const DiscussionLoading = () => {
  return (
    <div className="w-[1000px] py-6 border-t-[1px] flex flex-col gap-y-4">
      <div className="h-10 flex flex-row gap-x-2">
        <Skeleton className="w-10 h-10" />
        <div className="flex flex-col flex-1 justify-between">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  );
};

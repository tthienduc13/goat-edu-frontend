import { Skeleton } from "@/components/ui/skeleton";

export const PageLoading = () => {
  return (
    <div className="flex flex-col w-full mx-auto gap-y-6">
      <Skeleton className="h-10 w-full" />
      <div className="flex-1 min-h-[500px] h-full w-full flex px-10 flex-col gap-y-4">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};

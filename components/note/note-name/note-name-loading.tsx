import { Skeleton } from "@/components/ui/skeleton";

export const NoteNameLoading = () => {
  return (
    <div className="h-full w-1/5 overflow-y-scroll flex flex-col gap-y-2 py-4  pr-4 border-r-[2px]">
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
    </div>
  );
};

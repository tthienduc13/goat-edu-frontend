import { Skeleton } from "@/components/ui/skeleton";

export const EmptyCard = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        <Skeleton className="max-w-lg h-[200px] rounded-2xl" />
        <Skeleton className="max-w-lg h-[200px] rounded-2xl" />
        <Skeleton className="max-w-lg h-[200px] rounded-2xl" />
      </div>
    </div>
  );
};

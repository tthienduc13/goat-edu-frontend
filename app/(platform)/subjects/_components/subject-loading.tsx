import { Skeleton } from "@/components/ui/skeleton";

export const SubjectLoading = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <Skeleton className="h-9 w-[200px]" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="flex max-w-lg flex-col rounded-2xl overflow-hidden justify-center border border-zinc-100 dark:border-accent">
          <div className="w-full p-4 shadow-xl ">
            <Skeleton className="w-full h-[180px] rounded-2xl" />
            <Skeleton className="mt-2 h-6" />
            <Skeleton className="mt-4 h-7" />
            <Skeleton className="mt-4 h-7" />
          </div>
        </div>
        <div className="flex max-w-lg flex-col rounded-2xl overflow-hidden justify-center border border-zinc-100 dark:border-accent">
          <div className="w-full p-4 shadow-xl ">
            <Skeleton className="w-full h-[180px] rounded-2xl" />
            <Skeleton className="mt-2 h-6" />
            <Skeleton className="mt-4 h-7" />
            <Skeleton className="mt-4 h-7" />
          </div>
        </div>
        <div className="flex max-w-lg flex-col rounded-2xl overflow-hidden justify-center border border-zinc-100 dark:border-accent">
          <div className="w-full p-4 shadow-xl ">
            <Skeleton className="w-full h-[180px] rounded-2xl" />
            <Skeleton className="mt-2 h-6" />
            <Skeleton className="mt-4 h-7" />
            <Skeleton className="mt-4 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
};

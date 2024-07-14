import { Skeleton } from "@/components/ui/skeleton";

export const SubjectDetailLoading = () => {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full">
        <Skeleton className="h-9 w-[150px] mb-2" />
        <Skeleton className="h-6 w-full" />
        <div className="flex h-9 items-center">
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="mt-3">
          <div className="space-y-3 flex flex-col">
            <Skeleton className="w-full h-[52px]" />
            <Skeleton className="w-full h-[52px]" />
            <Skeleton className="w-full h-[52px]" />
            <Skeleton className="w-full h-[52px]" />
          </div>
        </div>
      </div>
      <div className="subjec-img mx-3 w-[500px]">
        <div className="ml-6 flex flex-col w-full">
          <Skeleton className="w-full h-[218px]" />
          <Skeleton className="mt-4 w-full h-[38px]" />
        </div>
      </div>
    </div>
  );
};

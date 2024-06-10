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
      <div className="mx-3 w-[416px]">
        <div className="ml-7 flex flex-col">
          <Skeleton className="w-full h-[155.56px]" />
          <div className="flex flex-col items-center">
            <Skeleton className="mt-4 w-[104px] h-[38px]" />
            <div className="flex flex-col space-y-[10px] pt-6">
              <Skeleton className="w-[100px] h-7" />
              <Skeleton className="w-[100px] h-7" />
              <Skeleton className="w-[100px] h-7" />
              <Skeleton className="w-[100px] h-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

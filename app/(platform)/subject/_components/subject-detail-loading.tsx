import { Skeleton } from "@/components/ui/skeleton";

export const SubjectDetailLoading = () => {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full">
        <Skeleton className="w-[full] h-9 mb-9" />
        <Skeleton className="h-[48px] w-[765px]" />
        <Skeleton className="h-7 mt-9 mb-1 w-[765px]" />
        <Skeleton className="w-[765px] h-9" />
        <div className="mt-3">
          <div className="space-y-3 flex flex-col">
            <Skeleton className="w-[765px] h-[52px]" />
            <Skeleton className="w-[765px] h-[52px]" />
            <Skeleton className="w-[765px] h-[52px]" />
            <Skeleton className="w-[765px] h-[52px]" />
          </div>
        </div>
      </div>
      <div className="mx-3">
        <div className="ml-7 flex flex-col">
          <Skeleton className="w-[386px] h-[218px]" />
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

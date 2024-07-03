import { Skeleton } from "@/components/ui/skeleton";

const TheoryLoading = () => {
  return (
    <div className=" w-full">
      <Skeleton className="w-[1000px] h-9" />
      <Skeleton className="mt-8 w-[1000px] h-7" />
      <Skeleton className="mt-4 w-[1000px] h-[150px]" />
      <Skeleton className="mt-4 w-[1000px] h-7" />
      <Skeleton className="mt-4 w-[1000px] h-[150px]" />
      <Skeleton className="mt-4 w-[1000px] h-7" />
      <Skeleton className="mt-4 w-[1000px] h-[150px]" />
    </div>
  );
};
export default TheoryLoading;

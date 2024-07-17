import { Skeleton } from "@/components/ui/skeleton";

const TheoryLoading = () => {
  return (
    <div className=" w-full">
      <Skeleton className=" w-full h-[150px]" />
      <Skeleton className="mt-4 w-full h-7" />
      <Skeleton className="mt-4 w-full h-[150px]" />
      <Skeleton className="mt-4 w-full h-7" />
      <Skeleton className="mt-4 w-full h-[150px]" />
    </div>
  );
};
export default TheoryLoading;

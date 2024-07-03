import { Skeleton } from "@/components/ui/skeleton";

const TheoryLoading = () => {
  return (
    <div className="space-y-4 w-full">
      <Skeleton className="w-full h-9" />
      <div>
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-20" />
      </div>
      <div>
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-20" />
      </div>
      <div>
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-20" />
      </div>
    </div>
  );
};
export default TheoryLoading;

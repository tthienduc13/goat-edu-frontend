import { Skeleton } from "@/components/ui/skeleton";

export const NotificationLoading = () => {
  return (
    <div className="flex flex-col w-full gap-y-2 ">
      <div className="flex flex-col w-full gap-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="flex flex-col w-full gap-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="flex flex-col w-full gap-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="flex flex-col w-full gap-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
};

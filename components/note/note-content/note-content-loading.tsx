import { Skeleton } from "@/components/ui/skeleton";

export const NoteContentLoading = () => {
  return (
    <div className="h-full w-4/5 p-5">
      <Skeleton className="h-full w-full " />
    </div>
  );
};

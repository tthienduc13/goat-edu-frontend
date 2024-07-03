import { Skeleton } from "@/components/ui/skeleton";

const FlashcardLoading = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-9 w-[800px]" />
      <Skeleton className="h-[444px] mt-5 w-[800px]" />
      <Skeleton className="h-[40px] mt-5 w-[800px]" />
    </div>
  );
};

export default FlashcardLoading;

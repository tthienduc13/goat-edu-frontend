import { Skeleton } from "@/components/ui/skeleton";

const FlashcardLoading = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-[444px] mt-5 w-full" />
      <Skeleton className="h-[40px] mt-5 w-full" />
    </div>
  );
};

export default FlashcardLoading;

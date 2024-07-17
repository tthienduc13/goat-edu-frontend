import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ResultSectionProps {
  isPassed: boolean;
  correctCount: number;
  totalQuestion: number;
}

export const ResultSection = ({
  isPassed,
  correctCount,
  totalQuestion,
}: ResultSectionProps) => {
  const router = useRouter();
  const handleAgain = () => {
    router.refresh();
  };
  return (
    <div
      className={cn(
        "text-xl font-normal border p-8 rounded-2xl dark:bg-slate-900",
        isPassed === false ? "text-red-500" : "text-green-500"
      )}
    >
      <p>
        Result : {correctCount} / {totalQuestion}
      </p>
      <p>
        {isPassed ? (
          "Congratulation, you passed the quiz, now you can study next the lesson"
        ) : (
          <div className="space-y-4">
            <p>Sorry, you did not passed the quiz</p>
            <Button onClick={handleAgain} variant="destructive">
              Try again
            </Button>
          </div>
        )}
      </p>
    </div>
  );
};

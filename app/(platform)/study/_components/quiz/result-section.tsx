import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "text-2xl font-normal border p-8 rounded-2xl dark:bg-slate-900",
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
            <Button variant="destructive">Try again</Button>
          </div>
        )}
      </p>
    </div>
  );
};

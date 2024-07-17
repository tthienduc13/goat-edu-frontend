import { QuestionInQuizz } from "@/types/question-in-quiz";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  data: QuestionInQuizz;
  currentShuffled:
    | {
        id: string;
        newAnswer: string[];
      }
    | undefined;
  correctAnswer: string | undefined;
  selectedAnswer: string | undefined;
  isSubmitted: boolean;
  handleAnswerClick: (quizId: string, answer: string) => void;
}

export const QuizCard = ({
  data,
  currentShuffled,
  correctAnswer,
  selectedAnswer,
  isSubmitted,
  handleAnswerClick,
}: QuizCardProps) => {
  return (
    <div className="w-full border rounded-xl py-6 px-8 mb-12 dark:bg-slate-900">
      <div className="question w-full mb-16">
        <p className="text-xl">{data.quizQuestion}</p>
      </div>
      <div className="answer w-full">
        <div className="flex items-center mb-6">Choose your answer</div>
        <div className="choices grid grid-cols-2 gap-4">
          {currentShuffled?.newAnswer.map((answer, answerIndex) => (
            <div
              key={answerIndex}
              className={cn(
                "rounded-xl p-[4px] border-2",
                isSubmitted
                  ? answer === correctAnswer && answer === selectedAnswer
                    ? "bg-green-500"
                    : answer === selectedAnswer &&
                      answer !== correctAnswer &&
                      "bg-red-500"
                  : selectedAnswer === answer
                  ? "bg-gradient-to-b from-[#fc538d] to-[#ce3df3]  border-background"
                  : "bg-background dark:bg-slate-900"
              )}
              onClick={() => handleAnswerClick(data.id, answer)}
            >
              <div className="bg-white dark:bg-slate-900 p-4 rounded-[8px]">
                {answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

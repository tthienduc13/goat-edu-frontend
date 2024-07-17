import { useQuizByType } from "@/app/api/quiz/quiz.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { QuestionInQuizz } from "@/types/question-in-quiz";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { QuizLoading } from "./quiz-loading";
import Empty from "../empty-state";
import { QuizCard } from "./quiz-card";
import { SubmitSection } from "./submit-section";
import { ResultSection } from "./result-section";

interface LessonQuizProps {
  lessonId: string;
}

type Correct = {
  quizId: string;
  quizCorrect: string;
};

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const mapQuizzesToCorrects = (quizzes: QuestionInQuizz[]): Correct[] => {
  return quizzes?.map((quiz) => ({
    quizId: quiz.id,
    quizCorrect: quiz.quizCorrect,
  }));
};

export const LessonQuiz = ({ lessonId }: LessonQuizProps) => {
  const user = useCurrentUser();

  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<
    { id: string; newAnswer: string[] }[] | undefined
  >();
  const [selectedAnswers, setSelectedAnswers] = useState<
    { quizId: string; answer: string }[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const {
    data: quizData,
    isLoading: quizIsLoading,
    error: quizError,
  } = useQuery(
    useQuizByType({ typeId: lessonId, typeName: "lesson", token: user?.token! })
  );

  useEffect(() => {
    if (quizData && quizData.questionInQuizzes) {
      const shuffled = quizData.questionInQuizzes.map((data) => {
        const answers = [
          data.quizCorrect,
          data.quizAnswer1,
          data.quizAnswer2,
          data.quizAnswer3,
        ];
        return { id: data.id, newAnswer: shuffleArray(answers) };
      });
      setShuffledAnswers(shuffled);
      setTotalQuestion(quizData.questionCount);
    }
  }, [quizData, quizData?.questionInQuizzes]);

  const correctAnswers: Correct[] = mapQuizzesToCorrects(
    quizData?.questionInQuizzes!
  );

  const handleAnswerClick = (quizId: string, answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) =>
      prev.some((item) => item.quizId === quizId)
        ? prev.map((item) =>
            item.quizId === quizId ? { ...item, answer } : item
          )
        : [...prev, { quizId, answer }]
    );
  };

  const calculateCorrectAnswers = () => {
    return selectedAnswers.reduce((count, selected) => {
      const correct = correctAnswers.find(
        (item) => item.quizId === selected.quizId
      );
      return correct && correct.quizCorrect === selected.answer
        ? count + 1
        : count;
    }, 0);
  };

  const submitAnswer = () => {
    setCorrectCount(calculateCorrectAnswers());
    {
      calculateCorrectAnswers() < totalQuestion
        ? setIsPassed(false)
        : setIsPassed(true);
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (quizIsLoading) {
    return <QuizLoading />;
  }

  if (!quizData || quizData.questionInQuizzes.length === 0) {
    return <Empty />;
  }

  return (
    <div className="w-full ">
      <div className="max-w-[800px] flex flex-col gap-y-5 w-full mx-auto">
        {isSubmitted && (
          <ResultSection
            isPassed={isPassed}
            correctCount={correctCount}
            totalQuestion={totalQuestion}
          />
        )}
        {quizData?.questionInQuizzes.map((data) => {
          const currentShuffled = shuffledAnswers?.find(
            (item) => item.id === data.id
          );
          const correctAnswer = correctAnswers.find(
            (item) => item.quizId === data.id
          )?.quizCorrect;
          const selectedAnswer = selectedAnswers.find(
            (item) => item.quizId === data.id
          )?.answer;
          return (
            <QuizCard
              key={data.id}
              correctAnswer={correctAnswer}
              currentShuffled={currentShuffled}
              selectedAnswer={selectedAnswer}
              data={data}
              isSubmitted={isSubmitted}
              handleAnswerClick={handleAnswerClick}
            />
          );
        })}
        {!isSubmitted && <SubmitSection submitAnswer={submitAnswer} />}
      </div>
    </div>
  );
};

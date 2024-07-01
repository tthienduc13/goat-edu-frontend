"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import done from "@/public/done.svg";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useQuizByType } from "@/app/api/quiz/quiz.query";
import { getQuizById, getQuizByType } from "@/app/api/quiz/quiz.api";
import { useCurrentUser } from "@/hooks/use-current-user";

interface QuizDetailProps {}

type Quiz = {
  quizId: string;
  quizQuestion: string;
  quizAnswer1: string;
  quizAnswer2: string;
  quizAnswer3: string;
  quizCorrect: string;
};

type Correct = {
  quizId: string;
  quizCorrect: string;
};

const quizs: Quiz[] = [
  {
    quizId: "1",
    quizQuestion: "11 + 1 = ?",
    quizAnswer1: "3",
    quizAnswer2: "4",
    quizAnswer3: "5",
    quizCorrect: "12",
  },
  {
    quizId: "2",
    quizQuestion: "5 x 4 = ?",
    quizAnswer1: "5",
    quizAnswer2: "10",
    quizAnswer3: "15",
    quizCorrect: "20",
  },
  {
    quizId: "3",
    quizQuestion: "a^2 - b^2 = ?",
    quizAnswer1: "(a-b)(a+b)^2",
    quizAnswer2: "(a-b)^2(a+b)",
    quizAnswer3: "(a-b)^2(a+b)^2",
    quizCorrect: "(a-b)(a+b)",
  },
  {
    quizId: "4",
    quizQuestion: "No 1 math South East VietNam is ...",
    quizAnswer1: "Lam",
    quizAnswer2: "Kiet",
    quizAnswer3: "Kiam",
    quizCorrect: "All answers are correct",
  },
  {
    quizId: "5",
    quizQuestion: "15 / 3 = ?",
    quizAnswer1: "8",
    quizAnswer2: "7",
    quizAnswer3: "6",
    quizCorrect: "5",
  },
];

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const mapQuizzesToCorrects = (quizzes: Quiz[]): Correct[] => {
  return quizzes.map((quiz) => ({
    quizId: quiz.quizId,
    quizCorrect: quiz.quizCorrect,
  }));
};

const QuizDetailPage = ({}: QuizDetailProps) => {
  const user = useCurrentUser();

  const [shuffledAnswers, setShuffledAnswers] =
    useState<{ id: string; newAnswer: string[] }[]>();
  const [selectedAnswers, setSelectedAnswers] = useState<
    { quizId: string; answer: string }[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  useEffect(() => {
    const Quiz = getQuizByType(
      "8a6f94ce-f5da-4b82-915c-bd74f17ea98d",
      "lesson",
      user?.token as string
    );
    const shuffled = quizs.map((data) => {
      const answers = [
        data.quizCorrect,
        data.quizAnswer1,
        data.quizAnswer2,
        data.quizAnswer3,
      ];
      return { id: data.quizId, newAnswer: shuffleArray(answers) };
    });
    setShuffledAnswers(shuffled);
  }, []);

  const correctAnswers: Correct[] = mapQuizzesToCorrects(quizs);

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
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-[800px] mx-auto">
      {isSubmitted && (
        <div className="text-5xl font-medium">
          {correctCount} / {quizs.length}
        </div>
      )}
      {quizs.map((data) => {
        const currentShuffled = shuffledAnswers?.find(
          (item) => item.id === data.quizId
        );
        const correctAnswer = correctAnswers.find(
          (item) => item.quizId === data.quizId
        )?.quizCorrect;
        const selectedAnswer = selectedAnswers.find(
          (item) => item.quizId === data.quizId
        )?.answer;

        return (
          <div
            key={data.quizId}
            className="w-full shadow-md rounded-xl py-6 px-8 mb-12 dark:bg-slate-900"
          >
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
                        ? answer === correctAnswer
                          ? "bg-green-500"
                          : answer === selectedAnswer &&
                            answer !== correctAnswer &&
                            "bg-red-500"
                        : selectedAnswer === answer
                        ? "bg-gradient-to-b from-[#fc538d] to-[#ce3df3]  border-background"
                        : "bg-background dark:bg-slate-900"
                    )}
                    onClick={() => handleAnswerClick(data.quizId, answer)}
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
      })}
      <div className="flex flex-col items-center gap-y-5 mt-8">
        <Image src={done} width={277} height={88} alt="img" />
        <div className="font-bold text-2xl">
          All done! Ready to submit your test?
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <Badge variant="default" className="h-10 w-16">
                Submit
              </Badge>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={submitAnswer}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
export default QuizDetailPage;

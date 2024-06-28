import { QuestionInQuizz } from "./questionInQuizz";

export type Quiz = {
  id: string;
  quiz1: string;
  quizLevel: number;
  lessonId: string;
  chapterId: string;
  subjectId: string;
  createdAt: Date;
  updatedAt: Date;
  isRequire: boolean;
  questionInQuizzes: QuestionInQuizz[];
  questionCount: number;
};

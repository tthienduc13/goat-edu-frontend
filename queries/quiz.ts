import { getQuizById, getQuizByType } from "@/app/api/quiz/quiz.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const quiz = createQueryKeys("quiz", {
  id: (id: string, token: string) => ({
    queryKey: [id],
    queryFn: () => getQuizById(id, token),
  }),
  type: (typeId: string, type: string, token: string) => ({
    queryKey: [typeId],
    queryFn: () => getQuizByType(typeId, type, token),
  }),
});

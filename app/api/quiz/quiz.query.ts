import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useQuizById = (id: string, token: string) => {
  return useQuery(queries.quiz.id(id, token));
};

export const useQuizByType = (typeId: string, type: string, token: string) => {
  return useQuery({
    ...queries.quiz.type(typeId, type, token),
    enabled: !!typeId,
  });
};

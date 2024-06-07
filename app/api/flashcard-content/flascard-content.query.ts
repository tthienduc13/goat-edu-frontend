import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useFlashcardContentById = (id: string, token: string) => {
  return useQuery(queries.flashcardContent.id(id, token));
};

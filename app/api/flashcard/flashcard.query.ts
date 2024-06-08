import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useFlashcards = (pageNumber: number, token: string) => {
  return useQuery(queries.flashcard.all(pageNumber, token));
};

export const useFlashcardById = (id: string, token: string) => {
  return useQuery(queries.flashcard.id(id, token));
};

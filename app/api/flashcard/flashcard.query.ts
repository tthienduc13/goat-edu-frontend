import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { getFlashcardById } from "./flashcard.api";

export const useFlashcards = (pageNumber: number, token: string) => {
  return useQuery(queries.flashcard.all(pageNumber, token));
};

export const useFlashcardById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["flashcard", id];
  const queryFn = async () => {
    return getFlashcardById(token, id).then((response) => response);
  };

  return { queryKey, queryFn };
};

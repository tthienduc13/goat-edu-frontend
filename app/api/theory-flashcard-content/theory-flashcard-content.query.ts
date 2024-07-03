import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useTheoryFlashCardContentByTheory = (
  theoryId: string,
  token: string
) => {
  return useQuery({
    ...queries["theory-flashcard-content"].theory(theoryId, token),
    enabled: !!theoryId,
  });
};

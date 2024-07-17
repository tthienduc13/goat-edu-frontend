import { useQuery } from "@tanstack/react-query";
import { getTheoryFlashcardContentByTheory } from "./theory-flashcard-content.api";

export const useTheoryFlashCardContentByTheory = ({
  theoryId,
  token,
}: {
  theoryId: string;
  token: string;
}) => {
  const queryKey = ["theory-flashcard-content", theoryId];
  const queryFn = async () => {
    return getTheoryFlashcardContentByTheory({ token: token, id: theoryId });
  };
  const enabled = !!theoryId;
  return {
    queryKey,
    queryFn,
    enabled,
  };
};

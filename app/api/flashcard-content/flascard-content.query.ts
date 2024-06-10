import { getAllFlashcardContentById } from "./flashcard-content.api";

export const useFlashcardContentById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["flashcardContent", id];

  const queryFn = async () => {
    return getAllFlashcardContentById(token, id).then((response) => response);
  };
  return { queryKey, queryFn };
};

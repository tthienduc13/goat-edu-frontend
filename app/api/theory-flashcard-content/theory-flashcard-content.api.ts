import axiosClient from "@/lib/axiosClient";
import { TheoryFlashCardContent } from "@/types/theory-flashcard-content";

const END_POINT = {
  GET_THEORY_FLASHCARD_CONTENT: "theory_flashcard/theory",
};

export const getTheoryFlashcardContentByTheory = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<TheoryFlashCardContent[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_THEORY_FLASHCARD_CONTENT}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

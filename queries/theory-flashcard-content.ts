import { queryTag } from "@/app/api/tag/tag.api";
import { getTheoryFlashcardContentByTheory } from "@/app/api/theory-flashcard-content/theory-flashcard-content.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const theoryFlashCardContent = createQueryKeys(
  "theory-flashcard-content",
  {
    theory: (id: string, token: string) => ({
      queryKey: [id],
      queryFn: () => getTheoryFlashcardContentByTheory(id, token),
    }),
  }
);

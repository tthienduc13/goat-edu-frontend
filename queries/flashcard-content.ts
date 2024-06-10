import { getAllFlashcardContentById } from "@/app/api/flashcard-content/flashcard-content.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const flashcardContent = createQueryKeys("flashcardContent", {
  id: (id: string, token: string) => ({
    queryKey: [id],
    queryFn: () => getAllFlashcardContentById(id, token),
  }),
});

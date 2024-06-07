import {
  getAllFlashcard,
  getFlashcardById,
} from "@/app/api/flashcard/flashcard.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const flashcard = createQueryKeys("flashcard", {
  all: (pageNumber: number, token: string) => ({
    queryKey: [pageNumber],
    queryFn: () => getAllFlashcard(pageNumber, token),
  }),
  id: (id: string, token: string) => ({
    queryKey: [id],
    queryFn: () => getFlashcardById(id, token),
  }),
});

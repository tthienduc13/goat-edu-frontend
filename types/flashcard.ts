type Flashcard = {
  flashcardName: string;
  flashcardDescription: string;
  userId: string;
  subjectId: string;
};

export type FlashcardContent = {
  flashcardId: string;
  flashcardContentQuestion: string;
  flashcardContentAnswer: string;
};

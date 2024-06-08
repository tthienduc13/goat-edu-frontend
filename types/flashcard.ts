export type Flashcard = {
  id: string;
  flashcardName: string;
  flashcardDescription: string;
  star: number;
  fullName: string;
  subjectName: string;
  subjectId: string;
  numberOfFlashcardContent: number;
};

export type FlashcardContent = {
  flashcardId: string;
  image: string;
  flashcardContentQuestion: string;
  flashcardContentAnswer: string;
};

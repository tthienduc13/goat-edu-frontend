export type Flashcard = {
  id: string;
  flashcardName: string;
  flashcardDescription: string;
  star: number;
  fullName: string;
  subjectName: string;
  numberOfFlashcardContent: number;
  userImage: string;
  updatedAt: Date;
};

export type FlashcardContent = {
  flashcardId: string;
  image: string;
  flashcardContentQuestion: string;
  flashcardContentAnswer: string;
};

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
  status: Status;
};

export type FlashcardContent = {
  id: string;
  frontHTML: string | JSX.Element;
  backHTML: string | JSX.Element;
};

export enum Status {
  Open = "Open",
  Hidden = "Hidden",
  Closed = "Closed",
}

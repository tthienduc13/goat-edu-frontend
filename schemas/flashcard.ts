import * as z from "zod";

export const NewFlashcardSchema = z.object({
  flashcardName: z.string({ required_error: "Title is required" }),
  flashcardDescription: z.string({ required_error: "Description is required" }),
  subjectId: z.string({ required_error: "Please choose related subject" }),
});

export const NewFlashcardContentSchema = z.object({
  flashcardContent: z
    .array(
      z.object({
        flashcardContentQuestion: z.string({
          required_error: "This field is required_error",
        }),
        flashcardContentAnswer: z.string({
          required_error: "This field is required_error",
        }),
      })
    )
    .min(3, { message: "Flashcard sets must contain at least 3 cards" }),
});

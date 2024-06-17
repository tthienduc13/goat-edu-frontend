import { message } from "antd";
import * as z from "zod";

export const NewFlashcardSchema = z.object({
  flashcardName: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title cannot be blank" })
    .max(50, { message: "Title is not exceed 50 characters" }),
  flashcardDescription: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description cannot be blank" })
    .max(150, { message: "Description is not exceed 150 characters" }),
  subjectId: z
    .string({ required_error: "Please choose related subject" })
    .nonempty("Please choose a related subject"),
});

export const NewFlashcardContentSchema = z.object({
  flashcardContent: z
    .array(
      z.object({
        flashcardContentQuestion: z
          .string({
            required_error: "This field is required_error",
          })
          .min(1, { message: "Question cannot be blank" })
          .max(50, { message: "Question is not exceed 150 characters" }),
        flashcardContentAnswer: z
          .string({
            required_error: "This field is required_error",
          })
          .min(1, { message: "Answer cannot be blank" })
          .max(50, { message: "Answer is not exceed 150 characters" }),
      })
    )
    .min(3, { message: "Flashcard sets must contain at least 3 cards" }),
});

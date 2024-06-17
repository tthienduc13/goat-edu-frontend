"use server";

import * as z from "zod";

import { NewFlashcardSchema } from "@/schemas/flashcard";
import { currentUser } from "@/lib/auth";
import { createFlashcard } from "@/app/api/flashcard/flashcard.api";

export const CreateFlashcard = async (
  values: z.infer<typeof NewFlashcardSchema>
) => {
  const user = await currentUser();

  const validatedFields = NewFlashcardSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const response = await createFlashcard({
    token: user?.token!,
    values: validatedFields.data,
  });

  if (response.data.status === 400 || response.data.status === 404) {
    return { error: response.message };
  }

  return { success: response.message, data: response.data };
};

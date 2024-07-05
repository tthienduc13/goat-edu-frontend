"use server";

import * as z from "zod";

import { FlashcardContentSchema } from "@/schemas/flashcard";
import { currentUser } from "@/lib/auth";
import { createFlashcardContent } from "@/app/api/flashcard-content/flashcard-content.api";

export const CreateFlashcardContent = async ({
  values,
  id,
}: {
  values: z.infer<typeof FlashcardContentSchema>;
  id: string;
}) => {
  const user = await currentUser();

  const validatedFields = FlashcardContentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const response = await createFlashcardContent({
    token: user?.token!,
    values: validatedFields.data,
    id: id,
  });

  if (response.status === 400 || response.status === 404) {
    return { error: response.message };
  }

  return { success: response.message, data: response.data };
};

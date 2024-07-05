import axiosClient from "@/lib/axiosClient";
import * as z from "zod";

import { FlashcardContentSchema } from "@/schemas/flashcard";
import { FlashcardContent } from "@/types/flashcard";

export const END_POINT = {
  CREATE: "/flashcard_content",
  GET_BY_ID: "/flashcard_content",
  PATCH: "/flashcard_conntent",
};

type FlashcardContentResponse = {
  id: string;
  image: string;
  flashcardContentQuestion: string;
  flashcardContentAnswer: string;
};

export const getAllFlashcardContentById = async (
  token: string,
  id: string
): Promise<FlashcardContent[]> => {
  try {
    const queryParams = new URLSearchParams({});
    const response = await axiosClient.get(
      `${END_POINT.GET_BY_ID}/${id}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const flashcardContent: FlashcardContent[] = response.data.map(
      (item: FlashcardContentResponse) => ({
        id: item.id,
        // frontHTML: `<div>${item.flashcardContentQuestion}</div>`,
        // backHTML: `<div>${item.flashcardContentAnswer}</div>`,
        // FUTURE FEAT: EDITOR AT FLASHCARD EDIT OR CREATE
        frontHTML: item.flashcardContentQuestion,
        backHTML: item.flashcardContentAnswer,
      })
    );
    return flashcardContent;
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    throw error;
  }
};

export const createFlashcardContent = async ({
  token,
  values,
  id,
}: {
  token: string;
  id: string;
  values: z.infer<typeof FlashcardContentSchema>;
}) => {
  const response = await axiosClient.post(
    `${END_POINT.CREATE}/${id}`,
    values.flashcardContent,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const patchFlashcardContent = async ({
  token,
  values,
  id,
}: {
  token: string;
  id: string;
  values: z.infer<typeof FlashcardContentSchema>;
}) => {
  const response = await axiosClient.patch(
    `${END_POINT.PATCH}/${id}`,
    values.flashcardContent,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

import axiosClient from "@/lib/axiosClient";
import * as z from "zod";

import { NewFlashcardContentSchema } from "@/schemas/flashcard";
import { FlashcardContent } from "@/types/flashcard";

export const END_POINT = {
  CREATE: "/flashcard_content",
  GET_BY_ID: "/flashcard_content",
};

type FlashcardContentResponse = {
  flashcardId: string;
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
        id: item.flashcardId,
        frontHTML: `<div>${item.flashcardContentQuestion}</div>`,
        backHTML: `<div>${item.flashcardContentAnswer}</div>`,
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
  values: z.infer<typeof NewFlashcardContentSchema>;
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

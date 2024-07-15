import axiosClient from "@/lib/axiosClient";
import * as z from "zod";

import {
  FlashcardContentItemSchema,
  FlashcardContentSchema,
} from "@/schemas/flashcard";
import { FlashcardContent } from "@/types/flashcard";

export const END_POINT = {
  CREATE: "/flashcard_content",
  GET_BY_ID: "/flashcard_content",
  PATCH_BY_ID: "/flashcard_content",
  DELETE_BY_ID: "/flashcard_content",
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

export const patchFlashcardContentById = async ({
  token,
  values,
  id,
}: {
  token: string;
  id: string;
  values: z.infer<typeof FlashcardContentItemSchema>;
}) => {
  const response = await axiosClient.patch(
    `${END_POINT.PATCH_BY_ID}/${id}`,
    {
      flashcardId: id,
      flashcardContentQuestion: values.flashcardContentQuestion,
      flashcardContentAnswer: values.flashcardContentAnswer,
      image: "",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteFlashcardContent = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const response = await axiosClient.delete(`${END_POINT.DELETE_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

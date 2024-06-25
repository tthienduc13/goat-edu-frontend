import * as z from "zod";

import axiosClient from "@/lib/axiosClient";
import { Flashcard, Status } from "@/types/flashcard";
import { NewFlashcardSchema } from "@/schemas/flashcard";

export const END_POINT = {
  GET_ALL: "/flashcard",
  GET_BY_ID: "/flashcard",
  CREATE: "/flashcard/subject",
};

export const getAllFlashcardSitemap = async (): Promise<Flashcard[]> => {
  try {
    const response = await axiosClient.get(`${END_POINT.GET_ALL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

export const getAllFlashcard = async (
  token: string,
  pageNumber: number
): Promise<Flashcard[]> => {
  try {
    const queryParams = new URLSearchParams({
      page_size: "20",
      page_number: pageNumber?.toString() ?? "",
    });
    const response = await axiosClient.get(
      `${END_POINT.GET_ALL}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

export const getFlashcardById = async (
  token: string,
  id: string
): Promise<Flashcard> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createFlashcard = async ({
  token,
  values,
}: {
  token: string;
  values: z.infer<typeof NewFlashcardSchema>;
}) => {
  const response = await axiosClient.post(
    `${END_POINT.CREATE}/${values.subjectId}`,
    {
      flashcardName: values.flashcardName,
      flashcardDescription: values.flashcardDescription,
      status: Status.Open,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

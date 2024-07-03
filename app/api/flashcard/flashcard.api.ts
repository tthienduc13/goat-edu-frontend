import * as z from "zod";

import axiosClient from "@/lib/axiosClient";
import { Flashcard, Status } from "@/types/flashcard";
import { NewFlashcardSchema } from "@/schemas/flashcard";

export const END_POINT = {
  GET_ALL: "/flashcard",
  GET_BY_USER: "/flashcard/user",
  GET_BY_ID: "/flashcard",
  CREATE: "/flashcard/subject",
  PATCH: "/flashcard",
  DELETE: "/flashcard",
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

export const getAllFlashcards = async ({
  token,
  sort,
  search,
  status,
  pageNumber,
  pageSize,
}: {
  token: string;
  sort?: string;
  search?: string;
  status?: Status;
  pageNumber?: number;
  pageSize?: number;
}): Promise<Flashcard[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (sort) {
      queryParams.append("sort", sort);
    }
    if (search) {
      queryParams.append("search", search);
    }
    if (status) {
      queryParams.append("status", status);
    }
    if (pageSize) {
      queryParams.append("page_size", pageSize.toString());
    }
    if (pageNumber) {
      queryParams.append("page_number", pageNumber.toString());
    }

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
      status: values.status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getAllUserFlashcard = async ({
  token,
  pageNumber,
}: {
  token: string;
  pageNumber: number;
}): Promise<Flashcard[]> => {
  try {
    const queryParams = new URLSearchParams({
      page_size: "10",
      page_number: pageNumber?.toString() ?? "",
    });
    const response = await axiosClient.get(
      `${END_POINT.GET_BY_USER}?${queryParams.toString()}`,
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

export const patchFlashcard = async ({
  token,
  id,
  flashcardName,
  flashcardDescription,
  status,
}: {
  token: string;
  id: string;
  flashcardName?: string | null;
  flashcardDescription?: string | null;
  status?: string | null;
}) => {
  try {
    const response = await axiosClient.patch(
      `${END_POINT.PATCH}/${id}`,
      {
        flashcardName: flashcardName ?? null,
        flashcardDescription: flashcardDescription ?? null,
        status: status ?? null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error patching flashcard:", error);
    throw error;
  }
};

export const deleteFlashcard = async (token: string, id: string) => {
  try {
    const response = await axiosClient.delete(`${END_POINT.DELETE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    throw error;
  }
};

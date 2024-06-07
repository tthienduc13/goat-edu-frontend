import axiosClient from "@/lib/axiosClient";
import { Flashcard } from "@/types/flashcard";

export const END_POINT = {
  GET_ALL: "/flashcard",
  GET_BY_ID: "/flashcard/",
};

export const getAllFlashcard = async (
  pageNumber: number,
  token: string
): Promise<Flashcard[]> => {
  try {
    const queryParams = new URLSearchParams({
      page_size: "20",
      page_number: pageNumber.toString(),
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
  id: string,
  token: string
): Promise<Flashcard> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

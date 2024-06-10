import axiosClient from "@/lib/axiosClient";
import { Flashcard, FlashcardContent } from "@/types/flashcard";

export const END_POINT = {
  GET_BY_ID: "/flashcard_content/",
};

// export const getDiscussionById = async (
//   id: string,
//   token: string
// ): Promise<Discussion> => {
//   const response = await axiosClient.get(`${END_POINT.GET_BY_ID}${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.data;
// };

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
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    throw error;
  }
};

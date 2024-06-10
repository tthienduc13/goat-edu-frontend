import axiosClient from "@/lib/axiosClient";
import { Note } from "@/types/note";

export const END_POINT = {
  GET_BY_USER: "/note/user",
  GET_BY_ID: "/note",
};

export const getNotesByUser = async (
  token: string,
  userId: string,
  pageNumber: number
): Promise<Note[]> => {
  try {
    const queryParams = new URLSearchParams({
      user_id: userId,
      page_size: "10",
      page_number: pageNumber.toString(),
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
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getNoteById = async (token: string, id: string): Promise<Note> => {
  try {
    const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

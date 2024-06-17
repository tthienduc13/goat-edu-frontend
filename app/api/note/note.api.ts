import axiosClient from "@/lib/axiosClient";
import { Note } from "@/types/note";

export const END_POINT = {
  GET_BY_USER: "/note/user",
  GET_BY_ID: "/note",
  CREATE: "/note",
  DELETE: "/note",
  PATCH: "/note",
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
    return response.data.data;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

export const createNote = async (
  token: string,
  values: Omit<Note, "id" | "userId" | "createdAt">
) => {
  try {
    const response = await axiosClient.post(`${END_POINT.CREATE}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const patchNote = async (
  token: string,
  id: string,
  noteName?: string | null,
  noteBody?: string | null,
  noteBodyHtml?: string | null
) => {
  try {
    const response = await axiosClient.patch(
      `${END_POINT.PATCH}/${id}`,
      {
        noteName: noteName ?? null,
        noteBody: noteBody ?? null,
        noteBodyHtml: noteBodyHtml ?? null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error patching note:", error);
    throw error;
  }
};

export const deleteNote = async (token: string, id: string) => {
  try {
    const response = await axiosClient.delete(`${END_POINT.DELETE}?ids=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

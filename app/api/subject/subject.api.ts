import axiosClient from "@/lib/axiosClient";
import { Subject } from "@/types/subject";

export const END_POINT = {
  GET_ALL: "/subject",
  GET_BY_ID: "/subject",
  GET_BY_CLASS: "/subject/class?",
  GET_CHAPTER_BY_SUBJECT: "subject/",
};

export const getAllSubjects = async (
  search?: string,
  pageNumber?: number,
  pageSize?: number
): Promise<Subject[]> => {
  try {
    const queryParams = new URLSearchParams({
      search: search?.toString() ?? "",
      page_size: pageSize?.toString() ?? "",
      page_number: pageNumber?.toString() ?? "",
    });
    const response = await axiosClient.get(
      `${END_POINT.GET_ALL}?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

export const getSubjectById = async (
  id: string,
  token: string
): Promise<Subject> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSubjectByClass = async (
  classes: string,
  token: string,
  pageSize?: number,
  pageNumber?: number
): Promise<Subject[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_CLASS}page_size=${pageSize}&page_number=${pageNumber}&classes=${classes}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

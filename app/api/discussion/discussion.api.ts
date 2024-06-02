import axiosClient from "@/lib/axiosClient";
import { Discussion } from "@/types/discussion";

export const END_POINT = {
  GET_BY_ID: "/discussion/",
  GET_ALL: "/discussion",
};

export const getDiscussionById = async (
  id: string,
  token: string
): Promise<Discussion> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllDiscussion = async (
  pageNumber: number,
  token: string
): Promise<Discussion[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_ALL}?page_size=6&page_number=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

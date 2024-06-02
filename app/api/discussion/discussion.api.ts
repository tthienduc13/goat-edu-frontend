import axiosClient from "@/lib/axiosClient";
import { Discussion } from "@/types/discussion";

export const END_POINT = {
  GET_BY_ID: "/discussion",
  GET_BY_USER: "/notification/user",
};

export const getDiscussionById = async (
  id: string,
  token: string
): Promise<Discussion> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllDiscussion = async (
  pageNumber: number,
  token: string
): Promise<Notification[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_USER}?page_size=10&page_number=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

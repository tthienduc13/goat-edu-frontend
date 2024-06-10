import axiosClient from "@/lib/axiosClient";
import { Discussion, Status } from "@/types/discussion";

export const END_POINT = {
  GET_BY_ID: "/discussion/",
  GET_ALL: "/discussion",
};

export const getDiscussionById = async (
  token: string,
  id: string
): Promise<Discussion> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const getAllDiscussion = async (
  status: Status,
  pageNumber: number,
  token: string
): Promise<Discussion[]> => {
  try {
    const queryParams = new URLSearchParams({
      status,
      page_size: "6",
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

import axiosClient from "@/lib/axiosClient";
import { Chapter } from "@/types/chapter";

export const END_POINT = {
  GET_BY_SUBJECT: "/subject",
};

export const getChapterBySubject = async (
  id: string,
  token: string
): Promise<Chapter[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_SUBJECT}/${id}/chapters`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

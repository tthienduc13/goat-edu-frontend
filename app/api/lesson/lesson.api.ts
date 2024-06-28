import axiosClient from "@/lib/axiosClient";
import { Lesson } from "@/types/lesson";

const END_POINT = {
  GET_LESSON_BY_CHAPTER: "/lesson/chapter",
};

export const getLessonByChapter = async (
  id: string,
  token: string,
  pageSize: number,
  pageNum: number
): Promise<Lesson[]> => {
  const reponse = await axiosClient.get(
    `${END_POINT.GET_LESSON_BY_CHAPTER}/${id}?page_size=${pageSize}&page_number=${pageNum}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return reponse.data;
};

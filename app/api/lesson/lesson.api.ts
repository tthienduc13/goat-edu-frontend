import axiosClient from "@/lib/axiosClient";
import { Lesson } from "@/types/lesson";

const END_POINT = {
  GET_LESSON_BY_CHAPTER: "/lesson/chapter",
  GET_BY_ID: "/lesson",
};

export const getLessonByChapter = async ({
  id,
  token,
  pageSize,
  pageNumber,
}: {
  id: string;
  token: string;
  pageSize: number;
  pageNumber: number;
}): Promise<Lesson[]> => {
  const reponse = await axiosClient.get(
    `${END_POINT.GET_LESSON_BY_CHAPTER}/${id}?page_size=${pageSize}&page_number=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return reponse.data;
};

export const getLessonById = async ({
  lessonId,
  token,
}: {
  lessonId: string;
  token: string;
}): Promise<Lesson> => {
  const reponse = await axiosClient.get(`${END_POINT.GET_BY_ID}/${lessonId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return reponse.data.data;
};

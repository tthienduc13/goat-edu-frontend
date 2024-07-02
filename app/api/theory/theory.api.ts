import axiosClient from "@/lib/axiosClient";
import { Theory } from "@/types/theory";

const END_POINT = {
  GET_THEORY_BY_LESSON: "/theory/lesson",
};

export const getTheoryByLesson = async (
  lessonId: string,
  token: string
): Promise<Theory[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_THEORY_BY_LESSON}/${lessonId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

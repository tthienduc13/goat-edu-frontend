import axiosClient from "@/lib/axiosClient";
import { Chapter } from "@/types/chapter";

export const END_POINT = {
  GET_BY_SUBJECT: "/subject",
  GET_BY_ID: "/chapter",
};

export const getChapterBySubject = async ({
  token,
  subjectId,
}: {
  subjectId: string;
  token: string;
}): Promise<Chapter[]> => {
  try {
    const response = await axiosClient.get(
      `${END_POINT.GET_BY_SUBJECT}/${subjectId}/chapters`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error while getting chapter by subject", error);
    throw error;
  }
};

export const getChapterById = async ({
  token,
  chapterId,
}: {
  token: string;
  chapterId: string;
}): Promise<Chapter> => {
  try {
    const response = await axiosClient.get(
      `${END_POINT.GET_BY_ID}/${chapterId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error while getting chapter by subject", error);
    throw error;
  }
};

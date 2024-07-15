import axiosClient from "@/lib/axiosClient";
import { Answer } from "@/types/answer";

export const END_POINT = {
  CREATE: "/answer",
  DELETE: "/answer",
  GET_BY_DISCUSSION: "/answer/discussion",
};

export const getAnswerByDiscussion = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<Answer[]> => {
  try {
    const response = await axiosClient.get(
      `${END_POINT.GET_BY_DISCUSSION}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error getting answer for discussion ${id}: `, error);
    return [];
  }
};

export const createAnswer = async ({
  token,
  answerBody,
  answerBodyHtml,
  id,
}: {
  token: string;
  answerBody: string;
  answerBodyHtml: string;
  id: string;
}) => {
  try {
    const response = await axiosClient.post(
      `${END_POINT.CREATE}`,
      {
        answerBody: answerBody,
        answerBodyHtml: answerBodyHtml,
        questionId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating answer:", error);
    throw error;
  }
};

export const deleteAnswer = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  try {
    const response = await axiosClient.delete(`${END_POINT.DELETE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating answer:", error);
    throw error;
  }
};

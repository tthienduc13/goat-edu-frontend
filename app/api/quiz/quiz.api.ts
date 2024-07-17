import axiosClient from "@/lib/axiosClient";
import { Quiz } from "@/types/quiz";

const END_POINT = {
  GET_QUIZ: "/quiz",
};

export const getQuizById = async (id: string, token: string): Promise<Quiz> => {
  const response = await axiosClient.get(`${END_POINT.GET_QUIZ}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getQuizByType = async ({
  typeId,
  type,
  token,
}: {
  typeId: string;
  type: string;
  token: string;
}): Promise<Quiz> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_QUIZ}?id=${typeId}&type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data[0];
};

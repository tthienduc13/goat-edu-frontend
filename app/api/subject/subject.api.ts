import axiosClient from "@/lib/axiosClient";
import { Chapter } from "@/types/chapter";
import { Subject } from "@/types/subject";

export const END_POINT = {
  GET_BY_ID: "/subject",
  GET_ALL: "/subject",
  GET_BY_CLASS: "/subject/class?",
  GET_CHAPTER_BY_SUBJECT: "subject/",
};

export const getSubjectById = async (
  id: string,
  token: string
): Promise<Subject> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllSubject = async (token: string) => {
  const response = await axiosClient.get(`${END_POINT.GET_ALL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSubjectByClass = async (
  classes: string,
  token: string
): Promise<Subject[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_CLASS}classes=${classes}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

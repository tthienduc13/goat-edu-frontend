import axiosClient from "@/lib/axiosClient";
import { Subject } from "@/types/subject";

export const END_POINT = {
  GET_ALL: "/subject",
  GET_BY_ID: "/subject",
  GET_BY_CLASS: "/subject/class?",
  GET_CHAPTER_BY_SUBJECT: "subject/",
  POST_ENROLL_SUBJECT: "/user/subject",
};

export const getAllSubjects = async ({
  token,
  sort,
  search,
  pageNumber,
  pageSize,
}: {
  token: string;
  sort?: string;
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<Subject[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (sort) {
      queryParams.append("sort", sort);
    }
    if (search) {
      queryParams.append("search", search);
    }
    if (pageSize) {
      queryParams.append("page_size", pageSize.toString());
    }
    if (pageNumber) {
      queryParams.append("page_number", pageNumber.toString());
    }
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

export const getSubjectByClass = async (
  classes: string,
  token: string,
  pageSize?: number,
  pageNumber?: number
): Promise<Subject[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_CLASS}page_size=${pageSize}&page_number=${pageNumber}&classes=${classes}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const enrollSubject = async (subjectId: string, token: string) => {
  const response = await axiosClient.post(
    `${END_POINT.POST_ENROLL_SUBJECT}/${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  response.data;
};

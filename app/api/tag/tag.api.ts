import axiosClient from "@/lib/axiosClient";
import { Tag } from "@/types/tag";

export const END_POINT = {
  QUERY: "/tag/query",
  GET_BY_USER: "/notification/user",
};

export const queryTag = async (
  search?: string,
  sort?: string,
  sortDirection?: string,
  pageSize?: number,
  pageNumber?: number
): Promise<Tag[]> => {
  const response = await axiosClient.get(
    `${END_POINT.QUERY}?Search=${search}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRoYW5oZGVwdHJhaSIsIlVzZXJJZCI6ImY0OTFjMGJjLWU1YjAtNGZjNy1hY2JmLWNiMDFlYjQzZWVjZSIsIlJvbGVJZCI6IjE5MDU5OGZlLWRmMzEtNGVhMi1hYmUzLWFiOTA1MGJlMDY5ZSIsInJvbGUiOiJBZG1pbiIsIkZ1bGxuYW1lIjoiTmd1eWVuVGhhbmgiLCJuYmYiOjE3MTcwNTAzOTQsImV4cCI6MTcxNzY1NTE5NCwiaWF0IjoxNzE3MDUwMzk0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.jhJbQ7MOxZjlSz305vfCWu8afh_SbEz8IpghlFTeLpE",
      },
    }
  );
  return response.data;
};

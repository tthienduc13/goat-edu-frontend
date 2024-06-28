import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useLessonByChapter = ({
  chapter,
  token,
  pageSize,
  pageNum,
}: {
  chapter: string;
  token: string;
  pageSize: number;
  pageNum: number;
}) => {
  return useQuery(queries.Lesson.Chapter(chapter, token, pageSize, pageNum));
};

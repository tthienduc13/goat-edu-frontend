import { getLessonByChapter } from "./lesson.api";

export const useLessonByChapter = ({
  token,
  chapterId,
  pageSize,
  pageNumber,
  isLoading,
}: {
  chapterId: string;
  token: string;
  pageSize: number;
  pageNumber: number;
  isLoading: boolean;
}) => {
  const queryKey = ["lesson", "chapter", chapterId, pageSize, pageNumber];
  const queryFn = async () => {
    return getLessonByChapter({
      token: token,
      id: chapterId,
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  };
  const enabled = !isLoading;

  return { queryKey, queryFn, enabled };
};

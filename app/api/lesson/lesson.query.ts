import { getLessonByChapter, getLessonById } from "./lesson.api";

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
  const enabled = !!chapterId;

  return { queryKey, queryFn, enabled };
};

export const useLessonById = ({
  token,
  lessonId,
}: {
  token: string;
  lessonId: string;
}) => {
  const queryKey = ["lesson", lessonId];

  const queryFn = async () => {
    return getLessonById({ token: token, lessonId: lessonId });
  };

  const enabled = !!lessonId;
  return {
    queryFn,
    queryKey,
    enabled,
  };
};

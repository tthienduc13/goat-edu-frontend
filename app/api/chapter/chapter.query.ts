import { useQuery } from "@tanstack/react-query";
import { getChapterById, getChapterBySubject } from "./chapter.api";

export const useChapterBySubject = ({
  token,
  subjectId,
}: {
  token: string;
  subjectId: string;
}) => {
  const queryKey = ["subject", "chapter", subjectId];
  const queryFn = async () => {
    return getChapterBySubject({ token: token, subjectId: subjectId });
  };
  const enabled = !!subjectId;
  return { queryKey, queryFn, enabled };
};

export const useChapterById = ({
  token,
  chapterId,
}: {
  token: string;
  chapterId: string;
}) => {
  const queryKey = ["chapter", chapterId];

  const queryFn = async () => {
    return getChapterById({ token: token, chapterId: chapterId });
  };

  const enabled = !!chapterId;

  return { queryKey, queryFn, enabled };
};

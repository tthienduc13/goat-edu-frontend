import { getTheoryByLesson } from "./theory.api";

export const useTheoryByLesson = ({
  lessonId,
  token,
}: {
  lessonId: string;
  token: string;
}) => {
  const queryKey = ["theory", "lesson", lessonId];
  const queryFn = async () => {
    return getTheoryByLesson({ lessonId: lessonId, token: token });
  };
  const enabled = lessonId !== undefined;
  return { queryFn, queryKey, enabled };
};

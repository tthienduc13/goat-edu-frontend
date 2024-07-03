import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useTheoryByLesson = (lessonId: string, token: string) => {
  return useQuery({
    ...queries.theory.Lesson(lessonId, token),
    enabled: !!lessonId,
  });
};

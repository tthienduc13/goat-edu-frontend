import { getTheoryByLesson } from "@/app/api/theory/theory.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const theory = createQueryKeys("theory", {
  Lesson: (lessonId: string, token: string) => ({
    queryKey: [lessonId],
    queryFn: () => getTheoryByLesson(lessonId, token),
  }),
});

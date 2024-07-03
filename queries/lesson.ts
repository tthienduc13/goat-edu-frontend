import { getLessonByChapter } from "@/app/api/lesson/lesson.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const lesson = createQueryKeys("Lesson", {
  Chapter: (
    Chapter: string,
    token: string,
    pageSize: number,
    pageNum: number
  ) => ({
    queryKey: [Chapter],
    queryFn: () => getLessonByChapter(Chapter, token, pageSize, pageNum),
  }),
});

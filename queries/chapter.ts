import { getChapterBySubject } from "@/app/api/chapter/chapter.apit";
import { subject } from "./subject";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const chapter = createQueryKeys("chapter", {
  subject: (subject: string, token: string) => ({
    queryKey: [subject],
    queryFn: () => getChapterBySubject(subject, token),
  }),
});

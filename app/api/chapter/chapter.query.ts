import { subject } from "./../../../queries/subject";
import { queries } from "@/queries/index";
import { useQuery } from "@tanstack/react-query";

export const useChapterBySubject = (subject: string, token: string) => {
  return useQuery(queries.chapter.subject(subject, token));
};

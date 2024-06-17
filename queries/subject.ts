import {
  getAllSubject,
  getSubjectByClass,
  getSubjectById,
} from "@/app/api/subject/subject.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const subject = createQueryKeys("subject", {
  all: (token: string) => ({
    queryKey: ["All"],
    queryFn: () => getAllSubject(token),
  }),
  id: (id: string, token: string) => ({
    queryKey: [id],
    queryFn: () => getSubjectById(id, token),
  }),
  classes: (
    classes: string,
    token: string,
    pageSize: number,
    pageNumber: number
  ) => ({
    queryKey: [classes, pageSize],
    queryFn: () => getSubjectByClass(classes, token, pageSize, pageNumber),
  }),
});

import {
  getAllSubjects,
  getSubjectByClass,
  getSubjectById,
} from "@/app/api/subject/subject.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const subject = createQueryKeys("subject", {
  id: (id: string, token: string) => ({
    queryKey: [id],
    queryFn: () => getSubjectById(id, token),
  }),
  classes: (classes: string, token: string) => ({
    queryKey: [classes],
    queryFn: () => getSubjectByClass(classes, token),
  }),
});

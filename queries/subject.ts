import {
  getAllSubjects,
  getSubjectByClass,
  getSubjectById,
} from "@/app/api/subject/subject.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const subject = createQueryKeys("subject", {
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

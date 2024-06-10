import { getNoteById } from "@/app/api/note/note.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const note = createQueryKeys("note", {
  id: (token: string, id: string) => ({
    queryKey: [id],
    queryFn: () => getNoteById(token, id),
  }),
});

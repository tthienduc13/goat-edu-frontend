import { getNoteById } from "@/app/api/note/note.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const note = createQueryKeys("note", {
  id: (id: string, token: string) => ({
    queryKey: [id],
    queryFn: () => getNoteById(token, id),
  }),
});

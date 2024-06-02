import { getDiscussionById } from "@/app/api/discussion/discussion.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const discussion = createQueryKeys("discussion", {
  id: (id: string, token: string) => ({
    queryKey: [id],
    queryFn: () => getDiscussionById(id, token),
  }),
});

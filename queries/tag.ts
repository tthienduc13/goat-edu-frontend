import { queryTag } from "@/app/api/tag/tag.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const tags = createQueryKeys("tags", {
  query: (search: string) => ({
    queryKey: ["tags", search],
    queryFn: () => queryTag(search),
  }),
});

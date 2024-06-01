import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useQueryTag = (search: string) => {
  return useQuery(queries.tags.query(search));
};

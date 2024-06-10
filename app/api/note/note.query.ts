import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNotesByUser } from "./note.api";
import { queries } from "@/queries";

export const useNotesByUser = (token: string, userId: string) => {
  return useInfiniteQuery({
    queryKey: ["note", userId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getNotesByUser(token, userId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

export const useNoteById = (token: string, id: string) => {
  return useQuery(queries.note.id(token, id));
};

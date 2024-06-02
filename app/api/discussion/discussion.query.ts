import { queries } from "@/queries";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getAllDiscussion } from "./discussion.api";

export const useDiscussionById = (id: string, token: string) => {
  return useQuery(queries.discussion.id(id, token));
};

export const useDiscussion = (token: string) => {
  return useInfiniteQuery({
    queryKey: ["discussion"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getAllDiscussion(pageParam, token),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

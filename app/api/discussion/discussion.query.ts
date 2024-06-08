import { queries } from "@/queries";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getAllDiscussion } from "./discussion.api";
import { Status } from "@/types/discussion";

export const useDiscussionById = (id: string, token: string) => {
  return useQuery(queries.discussion.id(id, token));
};

export const useDiscussion = (token: string, status: Status) => {
  return useInfiniteQuery({
    queryKey: ["discussion", status],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getAllDiscussion(status, pageParam, token),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

import { useInfiniteQuery } from "@tanstack/react-query";

import { getAllDiscussion, getDiscussionById } from "./discussion.api";
import { Status } from "@/types/discussion";

export const useDiscussionById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["discussion", id];

  const queryFn = async () => {
    return getDiscussionById(token, id);
  };

  return { queryKey, queryFn };
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

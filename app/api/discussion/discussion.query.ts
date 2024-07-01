import { useInfiniteQuery } from "@tanstack/react-query";

import {
  getAllDiscussion,
  getAllUserDisscusion,
  getDiscussionById,
} from "./discussion.api";

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

export const useInifiniteDiscussion = ({
  token,
  status,
  pageSize,
}: {
  token: string;
  status: Status;
  pageSize: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["discussion", status],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAllDiscussion({
        token: token,
        status: status,
        pageNumber: pageParam,
        pageSize: pageSize,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: true,
  });
};

export const useDiscussions = ({
  token,
  sort,
  pageNumber,
  pageSize,
  status,
}: {
  token: string;
  sort: string;
  pageNumber: number;
  pageSize: number;
  status: Status;
}) => {
  const queryKey = ["discussion", sort, pageNumber, pageSize, status];
  const queryFn = async () => {
    return getAllDiscussion({
      token: token,
      sort: sort,
      pageNumber: pageNumber,
      pageSize: pageSize,
      status: status,
    });
  };

  return { queryKey, queryFn };
};

export const useUserDiscussions = ({
  token,
  pageNumber,
}: {
  token: string;
  pageNumber: number;
}) => {
  const queryKey = ["discussion", "user", pageNumber];
  const queryFn = async () => {
    return getAllUserDisscusion({ token: token, pageNumber: pageNumber });
  };

  return { queryKey, queryFn };
};

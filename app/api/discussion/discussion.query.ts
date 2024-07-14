import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteDiscussion,
  getAllDiscussion,
  getAllUserDisscusion,
  getDiscussionById,
} from "./discussion.api";

import { Status } from "@/types/discussion";
import { toast } from "sonner";

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
  search,
  pageNumber,
  pageSize,
  status,
}: {
  token: string;
  sort: string;
  search: string;
  pageNumber: number;
  pageSize: number;
  status: Status;
}) => {
  const queryKey = ["discussion", sort, search, pageNumber, pageSize, status];
  const queryFn = async () => {
    return getAllDiscussion({
      token: token,
      sort: sort,
      search: search,
      pageNumber: pageNumber,
      pageSize: pageSize,
      status: status,
    });
  };

  return { queryKey, queryFn };
};

export const useSearchDiscussion = ({
  token,
  search,
  pageNumber,
  pageSize,
  status,
}: {
  token: string;
  search: string;
  pageNumber: number;
  pageSize: number;
  status: Status;
}) => {
  const queryKey = ["discussion", search, pageNumber, pageSize, status];
  const queryFn = async () => {
    return getAllDiscussion({
      token: token,
      search: search,
      pageNumber: pageNumber,
      pageSize: pageSize,
      status: status,
    });
  };
  const enabled = !!search;

  return { queryKey, queryFn, enabled };
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

export const useDeleteDiscussion = ({ token }: { token: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDiscussion(token, id),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["discussion", "user"],
        });
      } else {
        toast.error(data.message);
      }
    },
  });
};

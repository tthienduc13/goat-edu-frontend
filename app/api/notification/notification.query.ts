import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getNotificationByUser,
  markNotification,
  markNotificationById,
} from "./notification.api";
import { toast } from "sonner";

export const useNotificationByUser = (token: string) => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getNotificationByUser(pageParam, token),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    refetchOnMount: true,
  });
};

export const useMarkNotificationById = ({ token }: { token: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notiId }: { notiId: string }) =>
      markNotificationById({ token: token, notiId: notiId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export const useMarkAllNotification = ({ token }: { token: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => markNotification({ token: token }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

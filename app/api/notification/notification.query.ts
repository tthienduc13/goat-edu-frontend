import { notifications } from "@/queries/notification";
import { queries } from "@/queries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNotificationByUser } from "./notification.api";

export const useNotificationById = (id: string) => {
  return useQuery(queries.notifications.id(id));
};

export const useNotificationByUser = (token: string) => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getNotificationByUser(pageParam, token),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

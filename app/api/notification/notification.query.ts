import { queries } from "@/queries";
import { Notification } from "@/types/notification";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useNotificationById = (
  id: string
): UseQueryResult<Notification> => {
  return useQuery(queries.notifications.id(id));
};

export const useNotificationByUser = (
  userId: string,
  pageSize: number,
  pageNumber: number
): UseQueryResult<Notification[]> => {
  return useQuery(queries.notifications.user(userId, pageSize, pageNumber));
};

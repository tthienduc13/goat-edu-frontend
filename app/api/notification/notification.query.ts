import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useNotificationById = (id: string) => {
  return useQuery(queries.notifications.id(id));
};

export const useNotificationByUser = (
  userId: string,
  pageSize: number,
  pageNumber: number
) => {
  return useQuery(queries.notifications.user(userId, pageSize, pageNumber));
};

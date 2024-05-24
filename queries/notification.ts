import {
  getNotificationById,
  getNotificationByUser,
} from "@/app/api/notification/notification.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const notifications = createQueryKeys("notifications", {
  id: (id: string) => ({
    queryKey: [id],
    queryFn: () => getNotificationById(id),
  }),
  user: (userId: string, pageSize: number, pageNumber: number) => ({
    queryKey: [userId, pageSize, pageNumber],
    queryFn: () => getNotificationByUser(userId, pageSize, pageNumber),
  }),
});

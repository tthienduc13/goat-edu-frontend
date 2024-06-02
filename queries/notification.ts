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
  user: (pageNumber: number, token: string) => ({
    queryKey: [pageNumber],
    queryFn: () => getNotificationByUser(pageNumber, token),
  }),
});

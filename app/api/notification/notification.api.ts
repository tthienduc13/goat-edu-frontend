import axiosClient from "@/lib/axiosClient";
import { Notification } from "@/types/notification";

export const END_POINT = {
  GET_BY_ID: "/notification",
  GET_BY_USER: "/notification/user",
  MARK_BY_ID: "/notification",
  MARK_ALL: "/notification/user",
};

export const getNotificationById = async (
  id: string,
  token: string
): Promise<Notification> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getNotificationByUser = async (
  pageNumber: number,
  token: string
): Promise<Notification[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_USER}?page_size=5&page_number=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const markNotificationById = async ({
  token,
  notiId,
}: {
  token: string;
  notiId: string;
}) => {
  const response = await axiosClient.patch(
    `${END_POINT.MARK_BY_ID}/${notiId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const markNotification = async ({ token }: { token: string }) => {
  const response = await axiosClient.patch(
    `${END_POINT.MARK_ALL}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

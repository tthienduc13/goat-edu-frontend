import axiosClient from "@/lib/axiosClient";
import { Notification } from "@/types/notification";

export const END_POINT = {
  GET_BY_ID: "/notification",
  GET_BY_USER: "/notification/user",
};

export const getNotificationById = async (
  id: string
): Promise<Notification> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`);
  return response.data;
};

export const getNotificationByUser = async (
  userId: string,
  pageSize: number,
  pageNumber: number
): Promise<Notification[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_USER}?UserId=${userId}&PageSize=${pageSize}&PageNumber=${pageNumber}`
  );
  return response.data;
};

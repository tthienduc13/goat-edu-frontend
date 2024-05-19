import axiosClient from "../axios";

export const END_POINT = {
  GET_BY_ID: "/notification/",
  GET_BY_USER: "/notification/user",
};

export const getNotificationById = (id: string) => {
  return axiosClient.get(`${END_POINT.GET_BY_ID}${id}`);
};

export const getNotificationByUser = async (
  userId: string,
  pageSize: number,
  pageNumber: number
) => {
  return await axiosClient.get(
    `${END_POINT.GET_BY_USER}?UserId=${userId}&PageSize=${pageSize}&PageNumber=${pageNumber}`
  );
};

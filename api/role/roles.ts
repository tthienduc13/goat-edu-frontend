import axiosClient from "../axios";

export const END_POINT = {
  GET_ALL: "/role",
  GET_BY_ID: "/role/id?id=",
  GET_BY_NAME: "/role/name?name=",
};

export const getAllRole = async () => {
  return await axiosClient.get(END_POINT.GET_ALL);
};

export const getRoleById = (id: string) => {
  return axiosClient.get(`${END_POINT.GET_BY_ID}${id}`);
};

export const getRoleByName = (name: string) => {
  return axiosClient.get(`${END_POINT.GET_BY_NAME}${name}`);
};

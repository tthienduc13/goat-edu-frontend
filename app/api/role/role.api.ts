import axiosClient from "@/lib/axiosClient";

import { Role } from "@/types/role";

export const END_POINT = {
  GET_ALL: "/role",
  GET_BY_ID: "/role/id",
  GET_BY_NAME: "/role/name?name=",
};

export const getAllRole = async (): Promise<Role[]> => {
  const response = await axiosClient.get(END_POINT.GET_ALL);
  const filteredRoles = response.data.filter(
    (role: Role) => role.roleName === "Student" || role.roleName === "Teacher"
  );
  return filteredRoles;
};

export const getRoleById = async (id: string): Promise<Role> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`);
  return response.data;
};

export const getRoleByName = async (name: string): Promise<Role> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_NAME}${name}`);
  return response.data;
};

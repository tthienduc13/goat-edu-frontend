import { queries } from "./../../queries/index";
import { useQuery } from "@tanstack/react-query";
import { getAllRole } from "./roles";

export const useRoles = () => {
  return useQuery({
    ...queries.roles.all,
    queryFn: () => getAllRole(),
  });
};

export const useRoleById = (id: string) => {
  return useQuery(queries.roles.id(id));
};

export const useRoleByName = (name: string) => {
  return useQuery(queries.roles.name(name));
};

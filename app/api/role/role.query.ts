import { queries } from "@/queries/index";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getAllRole } from "./role.api";
import { Role } from "@/types/role";

export const useRoles = (): UseQueryResult<Role[]> => {
  return useQuery({
    ...queries.roles.all,
    queryFn: () => getAllRole(),
  });
};

export const useRoleById = (id: string): UseQueryResult<Role> => {
  return useQuery(queries.roles.id(id));
};

export const useRoleByName = (name: string) => {
  return useQuery(queries.roles.name(name));
};

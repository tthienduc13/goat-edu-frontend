import { getRoleById, getRoleByName } from "@/app/api/role/role.api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const roles = createQueryKeys("roles", {
  all: null,
  id: (id: string) => ({
    queryKey: [id],
    queryFn: () => getRoleById(id),
  }),
  name: (name: string) => ({
    queryKey: [name],
    queryFn: () => getRoleByName(name),
  }),
});

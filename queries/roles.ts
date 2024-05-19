import { getRoleById, getRoleByName } from "@/api/role/roles";
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

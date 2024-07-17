import { getAllRole } from "./role.api";

export const useRole = () => {
  const queryKey = ["role"];
  const queryFn = async () => {
    return getAllRole();
  };

  return { queryFn, queryKey };
};

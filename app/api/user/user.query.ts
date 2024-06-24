import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchNewUser } from "./user.api";

export const usePatchNewUser = (token: string) => {
  return useMutation({
    mutationFn: () => patchNewUser({ token }),
  });
};

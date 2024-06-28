import { useMutation } from "@tanstack/react-query";
import { getUserSubjects, patchNewUser } from "./user.api";

export const usePatchNewUser = (token: string) => {
  return useMutation({
    mutationFn: () => patchNewUser({ token }),
  });
};

export const useUserEnroll = ({
  token,
  pageNumber,
  pageSize,
}: {
  token: string;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const queryKey = ["subject", "user", pageNumber, pageSize];
  const queryFn = async () => {
    return getUserSubjects({
      token: token,
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  };
  return { queryFn, queryKey };
};

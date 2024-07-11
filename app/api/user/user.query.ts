import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollCourses, getUserSubjects, patchNewUser } from "./user.api";
import { toast } from "sonner";

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
  const queryKey = ["subject", "user", "enroll", pageNumber, pageSize];
  const queryFn = async () => {
    return getUserSubjects({
      token: token,
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  };
  return { queryFn, queryKey };
};

export const useEnrollCourse = ({ token }: { token: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      enrollCourses({ token: token, id: id }),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["subject", "user", 1, 100],
        });
      } else {
        toast.error(data.message);
      }
    },
  });
};

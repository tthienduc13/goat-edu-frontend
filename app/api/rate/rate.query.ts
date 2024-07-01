import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RateFlashcard, getUserRateBoolean } from "./rate.api";
import { toast } from "sonner";

export const useRate = ({ token, id }: { token: string; id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ rate }: { rate: number }) =>
      RateFlashcard({ token: token, flashcardId: id, rate: rate }),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["rate", "user", id] });
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to rate.");
    },
  });
};

export const useUserRate = ({ token, id }: { token: string; id: string }) => {
  const queryKey = ["rate", "user", id];

  const queryFn = async () => {
    return getUserRateBoolean({ token: token, id: id });
  };

  const enabled = !!id;

  return { queryFn, queryKey, enabled };
};

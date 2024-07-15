import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnswer, getAnswerByDiscussion } from "./answer.api";
import { toast } from "sonner";

export const useAnswerByDiscussion = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["answer", "discussion", id];

  const queryFn = async () => {
    return getAnswerByDiscussion({ token: token, id: id });
  };

  return { queryKey, queryFn };
};

export const useDeleteAnswer = ({
  token,
  discussionId,
}: {
  token: string;
  discussionId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ answerId }: { answerId: string }) =>
      deleteAnswer({ token: token, id: answerId }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["answer", "discussion", discussionId],
      });
    },
  });
};

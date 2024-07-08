import { voteDiscussion } from "@/app/api/vote/vote.api";
import { useVote } from "@/app/api/vote/vote.query";
import { UpvoteIcon } from "@/components/custom-icons/upvote-icon";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface UpvoteButtonProps {
  id: string;
  voteCount: number;
  isUserVoted: boolean;
}

export const UpvoteButton = ({
  voteCount,
  isUserVoted,
  id,
}: UpvoteButtonProps) => {
  const queryClient = useQueryClient();
  const user = useCurrentUser();
  const [isUserVotedState, setIsUserVotedState] =
    useState<boolean>(isUserVoted);
  const [voteCounter, setVoteCounter] = useState<number>(voteCount);

  const { mutationKey, mutationFn } = useVote({ token: user?.token!, id: id });

  const { mutate, isSuccess, isError, error, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (data.status === 200) {
        if (!isUserVotedState) {
          setVoteCounter((prevCount) => prevCount + 1);
          setIsUserVotedState(!isUserVotedState);
        } else {
          setVoteCounter((prevCount) => prevCount - 1);
          setIsUserVotedState(!isUserVotedState);
        }
        queryClient.invalidateQueries({
          queryKey: ["discussion", id],
        });
      }
    },
  });

  return (
    <div className="flex items-center gap-x-1 flex-row">
      <Button
        disabled={isPending}
        onClick={() => mutate()}
        variant="ghost"
        size="icon"
        className={cn(
          "hover:bg-emerald-500/70 ",
          isUserVotedState && "bg-emerald-500/70"
        )}
      >
        <UpvoteIcon />
      </Button>
      <span>{voteCounter}</span>
    </div>
  );
};

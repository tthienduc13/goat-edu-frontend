import { voteDiscussion } from "@/app/api/vote/vote.api";
import { useVote } from "@/app/api/vote/vote.query";
import { UpvoteIcon } from "@/components/custom-icons/upvote-icon";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
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
  const user = useCurrentUser();
  console.log(user);
  const [voteCounter, setVoteCounter] = useState<number>(voteCount);

  const { mutationKey, mutationFn } = useVote({ token: user?.token!, id: id });

  const { mutate, isSuccess, isError, error } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (data.status === 200) {
        if (!isUserVoted) {
          setVoteCounter((prevCount) => prevCount + 1);
        } else {
          setVoteCounter((prevCount) => prevCount - 1);
        }
      }
    },
  });

  // const handleVote = async () => {
  //   await voteDiscussion({ token: user?.token!, id: id });
  // };

  return (
    <div className="flex items-center gap-x-1 flex-row">
      <Button
        onClick={() => mutate()}
        variant="ghost"
        size="icon"
        className={cn(
          "hover:bg-emerald-500/70 ",
          isUserVoted && "bg-emerald-500/70"
        )}
      >
        <UpvoteIcon />
      </Button>
      <span>{voteCounter}</span>
    </div>
  );
};

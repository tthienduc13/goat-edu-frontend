import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useConnectionStore } from "@/stores/useConnectionStore";
import { useEffect, useState } from "react";
import { UpvoteIcon } from "./upvote-icon";
import { useQueryClient } from "@tanstack/react-query";

interface UpvoteButtonProps {
  id: string;
  voteCount: number;
  isUserVoted: boolean;
  discussionId: string;
}
export const UpvoteButton = ({
  voteCount,
  isUserVoted,
  id,
  discussionId,
}: UpvoteButtonProps) => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const [voteCountState, setVoteCountState] = useState<number>(voteCount);

  const { connection } = useConnectionStore();

  const handleVote = (answerId: string) => {
    connection
      ?.invoke("SendVoteAnswer", answerId)
      .then(() => {
        // queryClient.invalidateQueries({
        //   queryKey: ["answer", "discussion", discussionId],
        // });
      })
      .catch((error) => {
        console.error("Error sending vote answer:", error);
      });
  };

  const handleVotedEvent = (mess: string, votes: number) => {
    setVoteCountState(votes);
  };

  useEffect(() => {
    connection?.on("VoteAnswer", handleVotedEvent);

    return () => {
      connection?.off("VoteAnswer");
    };
  }, [connection]);

  return (
    <div className="flex items-center gap-x-1 flex-row">
      <Button
        disabled={!connection}
        onClick={() => handleVote(id)}
        variant="ghost"
        size="icon"
        className={cn(
          "hover:bg-emerald-500/70",
          isUserVoted && "bg-emerald-500/70"
        )}
      >
        <UpvoteIcon />
      </Button>
      <span>{voteCountState}</span>
    </div>
  );
};

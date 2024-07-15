import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UpvoteIcon } from "@/components/custom-icons/upvote-icon";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useConnectionStore } from "@/stores/useConnectionStore";
import { useQueryClient } from "@tanstack/react-query";

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
  const [voteCountState, setVoteCountState] = useState<number>(voteCount);

  const { connection } = useConnectionStore();

  const handleVote = (discussionId: string) => {
    connection
      ?.invoke("SendVoteDiscussion", discussionId)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["discussion", id] });
      })
      .catch((error) => {
        console.error("Error sending vote:", error);
      });
  };

  const handleVotedEvent = (mess: string, votes: number) => {
    setVoteCountState(votes);
  };

  useEffect(() => {
    connection?.on("Voted", handleVotedEvent);

    return () => {
      connection?.off("Voted");
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

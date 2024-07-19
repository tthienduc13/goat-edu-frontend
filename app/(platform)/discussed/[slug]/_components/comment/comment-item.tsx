import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LatexRenderer } from "@/lib/latext-render";
import { cn, formatTimeAgo } from "@/lib/utils";
import { Answer } from "@/types/answer";
import { MoreButton } from "@/components/custom/buttons/more-button";
import { Button } from "@/components/ui/button";
import { useConnectionStore } from "@/stores/useConnectionStore";
import { useEffect, useState } from "react";
import { UpvoteIcon } from "./upvote-icon";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteAnswer } from "@/app/api/answer/answer.query";

interface CommentItemProps {
  data: Answer;
  discussionId: string;
}

export const CommentItem = ({ data, discussionId }: CommentItemProps) => {
  const user = useCurrentUser();
  const [open, setOpen] = useState<boolean>(false);
  const { connection } = useConnectionStore();
  const [voteCountState, setVoteCountState] = useState<number>(data.answerVote);
  const [userVote, setUserVote] = useState<boolean>(data.isUserVoted);

  const { mutate: deleteComment } = useDeleteAnswer({
    token: user?.token!,
    discussionId: discussionId,
  });

  const handleDelete = (answerId: string) => {
    setOpen(false);
    deleteComment({ answerId: answerId });
  };

  const handleVote = (answerId: string) => {
    connection
      ?.invoke("SendVoteAnswer", answerId)
      .then(() => {
        setUserVote(!userVote);
      })
      .catch((error) => {
        console.error("Error sending vote answer:", error);
      });
  };

  const handleVoted = (mess: string, answerId: string, votes: number) => {
    if (answerId === data.id) {
      setVoteCountState(votes);
    }
  };

  useEffect(() => {
    connection?.on("VoteAnswer", handleVoted);

    return () => {
      connection?.off("VoteAnswer", handleVoted);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  return (
    <div className="flex flex-row gap-x-2">
      <Avatar>
        <AvatarImage
          src={data.userInformation.userImage}
          alt="user image"
          className="object-cover"
        />
        <AvatarFallback>GE</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-y-2 py-2">
        <div className="flex flex-row items-center gap-x-2">
          <div className="text-sm font-semibold">
            {data.userInformation.fullName}
          </div>
          <div className="text-xs font-light text-muted-foreground">
            {formatTimeAgo(data.createdAt)}
          </div>
        </div>
        <div className="w-full text-sm">
          <LatexRenderer latex={data.answerBodyHtml} />
        </div>
        <div className="flex flex-row items-center gap-x-4">
          <div>
            <div className="flex items-center gap-x-1">
              <Button
                disabled={!connection}
                onClick={() => handleVote(data.id)}
                variant="ghost"
                size="icon"
                className={cn(
                  "hover:bg-emerald-500/70",
                  userVote && "bg-emerald-500/70"
                )}
              >
                <UpvoteIcon />
              </Button>
              <span>{voteCountState}</span>
            </div>
          </div>
          {user?.id === data.userInformation.userId && (
            <MoreButton open={open} setOpen={setOpen}>
              <Button
                onClick={() => handleDelete(data.id)}
                className="w-full"
                variant={"ghost"}
                size={"sm"}
              >
                Delete
              </Button>
            </MoreButton>
          )}
        </div>
      </div>
    </div>
  );
};
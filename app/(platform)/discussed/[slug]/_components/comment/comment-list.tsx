import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreButton } from "@/components/custom/buttons/more-button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAnswerByDiscussion } from "@/app/api/answer/answer.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Answer } from "@/types/answer";
import { formatTimeAgo } from "@/lib/utils";
import { LatexRenderer } from "@/lib/latext-render";
import { UpvoteButton } from "./upvote-button";

interface CommentListProps {
  id: string;
}

export const CommentList = ({ id }: CommentListProps) => {
  const user = useCurrentUser();
  const [commentList, setCommentList] = useState<Answer[]>([]);
  const { data, isLoading, error } = useQuery(
    useAnswerByDiscussion({ token: user?.token!, id: id })
  );

  useEffect(() => {
    if (data) {
      setCommentList(data);
    }
  }, [data]);

  if (isLoading) {
    return;
  }
  return (
    <div className="flex flex-col w-full gap-y-5">
      {commentList.map((item) => (
        <div key={item.id} className="flex flex-row gap-x-2">
          <Avatar>
            <AvatarImage
              src={item.userInformation.userImage}
              alt="user image"
              className="object-cover"
            ></AvatarImage>
            <AvatarFallback>GE</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-2 py-2">
            <div className="flex flex-row items-center gap-x-2">
              <div className="text-sm font-semibold">Duc Nguyen Le Thien</div>
              <div className="text-xs font-light text-muted-foreground">
                {formatTimeAgo(item.createdAt)}
              </div>
            </div>
            <div className="w-full text-sm">
              <LatexRenderer latex={item.answerBodyHtml} />
            </div>
            <div className="flex flex-row items-center gap-x-4">
              <UpvoteButton
                voteCount={item.answerVote}
                isUserVoted={item.isUserVoted}
                id={item.id}
              />
              <MoreButton />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

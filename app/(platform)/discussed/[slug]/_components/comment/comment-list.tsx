import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreButton } from "@/components/custom/buttons/more-button";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAnswerByDiscussion } from "@/app/api/answer/answer.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Answer } from "@/types/answer";
import { CommentItem } from "./comment-item";
import { EmptyCommentList } from "./empty-comment-list";

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

  const handleVoted = (mess: string, answerId: string, votes: number) => {
    commentList.map((comment) => {
      if (comment.id === answerId) {
        comment.answerVote === votes;
        console.log(votes);
      }
    });
  };

  if (isLoading) {
    return;
  }

  if (commentList.length === 0) {
    return <EmptyCommentList />;
  }
  return (
    <div className="flex flex-col w-full gap-y-5">
      {commentList.map((comment) => (
        <CommentItem
          key={comment.id}
          data={comment}
          discussionId={id}
          handleVoted={handleVoted}
        />
      ))}
    </div>
  );
};

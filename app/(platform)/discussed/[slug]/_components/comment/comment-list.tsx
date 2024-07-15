import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAnswerByDiscussion } from "@/app/api/answer/answer.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Answer } from "@/types/answer";
import { CommentItem } from "./comment-item";
import { EmptyCommentList } from "./empty-comment-list";
import { useConnectionStore } from "@/stores/useConnectionStore";

interface CommentListProps {
  id: string;
}

export const CommentList = ({ id }: CommentListProps) => {
  const user = useCurrentUser();
  const { connection } = useConnectionStore();
  const [commentList, setCommentList] = useState<Answer[]>([]);
  const { data, isLoading, error, refetch } = useQuery(
    useAnswerByDiscussion({ token: user?.token!, id: id })
  );

  useEffect(() => {
    if (data) {
      setCommentList(data);
    }
  }, [data]);

  const handleGetAnswer = (answerNew: string) => {
    refetch();
  };

  useEffect(() => {
    if (connection) {
      connection.on("Answer", handleGetAnswer);

      return () => {
        connection.off("Answer", handleGetAnswer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  if (isLoading) {
    return;
  }

  if (commentList.length === 0) {
    return <EmptyCommentList />;
  }
  return (
    <div className="flex flex-col w-full gap-y-5">
      {commentList.map((comment) => (
        <CommentItem key={comment.id} data={comment} discussionId={id} />
      ))}
    </div>
  );
};

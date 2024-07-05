import Editor from "@/components/novel/novel-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CommentEditor from "./comment-editor";
import useSaveStatusStore from "@/stores/useSaveStatusStore";
import { createAnswer } from "@/app/api/answer/answer.api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface CommentProps {
  id: string;
}

export const Comment = ({ id }: CommentProps) => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const { saveStatus } = useSaveStatusStore();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [jsonContent, setJsonContent] = useState<string>("");

  const handleCreateComment = async () => {
    const response = await createAnswer({
      token: user?.token!,
      answerBody: jsonContent,
      answerBodyHtml: htmlContent,
      id: id,
    });
    if (response.status === 200) {
      queryClient.invalidateQueries({
        queryKey: ["answer", "discussion", id],
      });
      toast.success(response.message);
      setIsOpenComment(false);
      setHtmlContent("");
      setJsonContent("");
    }
  };

  return (
    <div className="flex flex-col mt-5 gap-y-3">
      <div className="text-lg font-semibold">Comments</div>
      {isOpenComment ? (
        <CommentEditor
          setHtmlContent={setHtmlContent}
          setJsonContent={setJsonContent}
        />
      ) : (
        <div
          onClick={() => setIsOpenComment(!isOpenComment)}
          className="h-12 w-full rounded-xl border shadow-lg cursor-text"
        ></div>
      )}

      <div className="w-full flex justify-end gap-x-4">
        <Button onClick={() => setIsOpenComment(false)} variant={"secondary"}>
          Cancel
        </Button>
        <Button onClick={handleCreateComment} disabled={saveStatus !== "Saved"}>
          Comment
        </Button>
      </div>
    </div>
  );
};

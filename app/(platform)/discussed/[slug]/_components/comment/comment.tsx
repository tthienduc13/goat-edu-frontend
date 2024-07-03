import Editor from "@/components/novel/novel-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CommentEditor from "./comment-editor";
import useSaveStatusStore from "@/stores/useSaveStatusStore";

interface CommentProps {
  id: string;
}

export const Comment = ({ id }: CommentProps) => {
  const { saveStatus } = useSaveStatusStore();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [jsonContent, setJsonContent] = useState<string>("");

  return (
    <div className="flex flex-col mt-5 gap-y-2">
      <div className="text-lg font-semibold">Comments</div>
      <CommentEditor
        setHtmlContent={setHtmlContent}
        setJsonContent={setJsonContent}
      />
      <div className="w-full flex justify-end gap-x-4">
        <Button
          disabled={
            saveStatus !== "saved" || htmlContent === "" || jsonContent === ""
          }
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

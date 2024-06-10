"use client";

import { useState } from "react";
import NoteEditor from "./note-editor";
import { useNoteById } from "@/app/api/note/note.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NoteContentLoading } from "./note-content-loading";
import { Button } from "../ui/button";
import { SquarePen, StickyNote } from "lucide-react";
import { MoreButton } from "../custom/buttons/more-button";
import { Hint } from "../custom/hint";

interface NoteContentProps {
  selectedNoteId: string;
}

export const NoteContent = ({ selectedNoteId }: NoteContentProps) => {
  const user = useCurrentUser();
  const [htmlContent, setHtmlContent] = useState<string>("");

  const { data, isLoading, error } = useNoteById(user?.token!, selectedNoteId);

  if (isLoading) {
    return <NoteContentLoading />;
  }

  return (
    <div className="h-full w-4/5 overflow-y-scroll">
      {data && (
        <NoteEditor
          htmlContent={data.noteBody}
          setHtmlContent={setHtmlContent}
        />
      )}
    </div>
  );
};

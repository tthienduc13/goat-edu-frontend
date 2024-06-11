"use client";

import { useState } from "react";
import NoteEditor from "./note-editor";
import { useNoteById } from "@/app/api/note/note.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NoteContentLoading } from "./note-content-loading";

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
          selectedNoteId={selectedNoteId}
          userId={user?.id!}
          token={user?.token!}
          htmlContent={data.noteBody}
          setHtmlContent={setHtmlContent}
        />
      )}
    </div>
  );
};

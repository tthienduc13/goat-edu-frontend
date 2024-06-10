"use client";

import { useState } from "react";
import type { JSONContent } from "novel";
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

  if (!data || isLoading) {
    return <NoteContentLoading />;
  }
  console.log(data.noteBody);
  return (
    <div className="h-full w-4/5 overflow-y-scroll">
      <NoteEditor htmlContent={data.noteBody} setHtmlContent={setHtmlContent} />
      {/* <div dangerouslySetInnerHTML={{ __html: data.noteBody }}></div> */}
    </div>
  );
};

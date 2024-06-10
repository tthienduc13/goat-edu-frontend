"use client";

import { useState } from "react";
import { NoteContent } from "./note-conent";
import { NoteName } from "./note-name";

export const Note = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  console.log(selectedNoteId);
  return (
    <div className="w-full h-[500px] flex flex-row justify-start">
      <NoteName
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
      />
      <NoteContent selectedNoteId={selectedNoteId} />
    </div>
  );
};

"use client";

import { useState } from "react";
import { NoteContent } from "./note-content";
import { NoteName } from "./note-name";

export const Note = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  return (
    <div className="w-full h-[500px] flex flex-row justify-start">
      <NoteName
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
      />
      {selectedNoteId !== "" && <NoteContent selectedNoteId={selectedNoteId} />}
    </div>
  );
};

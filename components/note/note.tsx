"use client";

import { useState } from "react";
import { NoteContent } from "./note-content/note-content";
import { NoteName } from "./note-name/note-name";
import { NoteContentEmpty } from "./note-content/note-content-empty";

export const Note = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  return (
    <div className="w-full h-[500px] flex flex-row justify-start">
      <NoteName
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
      />
      {selectedNoteId !== "" ? (
        <NoteContent selectedNoteId={selectedNoteId} />
      ) : (
        <NoteContentEmpty />
      )}
    </div>
  );
};

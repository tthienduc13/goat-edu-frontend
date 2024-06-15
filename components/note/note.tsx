"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NoteContent } from "./note-content/note-content";
import { NoteName } from "./note-name/note-name";
import { NoteContentEmpty } from "./note-content/note-content-empty";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useNotesByUser } from "@/app/api/note/note.query";
import { NoteNameLoading } from "./note-name/note-name-loading";
import { Button } from "../ui/button";
import { NoteNameInput } from "./note-name/note-name-input";

export const Note = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const user = useCurrentUser();

  const observer = useRef<IntersectionObserver>();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useNotesByUser(user?.token!, user?.id!);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const notes = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  useEffect(() => {
    if (notes && notes.length > 0) {
      setSelectedNoteId(notes[0].id);
    }
  }, [notes, setSelectedNoteId]);

  if (isLoading) {
    return <NoteNameLoading />;
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="w-full h-[500px]">
        <NoteContentEmpty />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-row justify-start">
      <div className="h-full w-1/5 overflow-y-scroll flex flex-col gap-y-2 py-4  pr-4 border-r-[2px]">
        {notes.map((note) => (
          <div key={note.id} ref={lastElementRef}>
            <Button
              variant={selectedNoteId === note.id ? "secondary" : "ghost"}
              onClick={() => {
                setSelectedNoteId(note.id);
              }}
              className="rounded-lg"
            >
              <NoteNameInput id={note.id} noteName={note.noteName} />
            </Button>
          </div>
        ))}
      </div>
      <NoteContent selectedNoteId={selectedNoteId} />
    </div>
  );
};

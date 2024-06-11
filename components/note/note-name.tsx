import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotesByUser, usePatchNote } from "@/app/api/note/note.query";
import { NoteNameLoading } from "./note-name-loading";
import { useDebouncedCallback } from "use-debounce";

interface NoteNameProps {
  selectedNoteId: string;
  setSelectedNoteId: React.Dispatch<React.SetStateAction<string>>;
}

export const NoteName = ({
  selectedNoteId,
  setSelectedNoteId,
}: NoteNameProps) => {
  const user = useCurrentUser();

  const { mutate: patchName } = usePatchNote(
    user?.token!,
    selectedNoteId,
    user?.id!
  );

  const debounceUpdate = useDebouncedCallback(
    (inputValue) => patchName(inputValue),
    500
  );

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
  return (
    <div className="h-full w-1/5 overflow-y-scroll flex flex-col gap-y-2 py-4  pr-4 border-r-[2px]">
      {notes &&
        notes.map((note) => (
          <div key={note.id} ref={lastElementRef}>
            <Button
              variant={selectedNoteId === note.id ? "secondary" : "ghost"}
              onClick={() => {
                setSelectedNoteId(note.id);
              }}
              className="rounded-lg"
            >
              <Input
                placeholder={note.noteName}
                onChange={(e) => {
                  debounceUpdate(e.target.value);
                }}
                className="border-none shadow-none outline-none focus:outline-none focus-visible:ring-0"
              ></Input>
            </Button>
          </div>
        ))}
    </div>
  );
};

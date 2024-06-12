import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNotesByUser } from "@/app/api/note/note.query";
import { NoteNameLoading } from "./note-name-loading";
import { NoteNameInput } from "./note-name-input";

interface NoteNameProps {
  selectedNoteId: string;
  setSelectedNoteId: React.Dispatch<React.SetStateAction<string>>;
}

export const NoteName = ({
  selectedNoteId,
  setSelectedNoteId,
}: NoteNameProps) => {
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
              <NoteNameInput id={note.id} noteName={note.noteName} />
            </Button>
          </div>
        ))}
    </div>
  );
};

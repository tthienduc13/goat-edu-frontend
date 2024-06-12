"use client";

import { useAddNote } from "@/app/api/note/note.query";
import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";

interface NoteCreateButtonProps {
  type?: "icon" | "text";
}

export const NoteCreateButton = ({ type = "icon" }: NoteCreateButtonProps) => {
  const user = useCurrentUser();

  const { mutate: addNote } = useAddNote(user?.token!, user?.id!);

  const handleAddNote = () => {
    const newNote = {
      noteName: "Untitled",
      noteBody: null,
      noteBodyHtml: null,
    };
    addNote(newNote);
  };
  return (
    <div>
      {type === "icon" ? (
        <Hint label="Create new note" side="bottom" sideOffset={10}>
          <Button
            onClick={handleAddNote}
            variant="ghost"
            size="icon"
            className={cn("rounded-full")}
          >
            <SquarePen className="w-5 h-5" />
          </Button>
        </Hint>
      ) : (
        <Button
          onClick={handleAddNote}
          variant={"secondary"}
          size={"default"}
          className={cn("rounded-md")}
        >
          <span>Create </span>
        </Button>
      )}
    </div>
  );
};

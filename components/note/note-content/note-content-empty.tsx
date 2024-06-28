import Image from "next/image";
import { NoteCreateButton } from "../note-control/note-create-button";
import EmptyNote from "@/public/icons/empty/empty-note.svg";

export const NoteContentEmpty = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Image src={EmptyNote} height={110} width={110} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first note!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a note for your learning
      </p>
      <div className="mt-6">
        <NoteCreateButton type="text" />
      </div>
    </div>
  );
};

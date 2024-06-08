import { Pencil, StickyNote } from "lucide-react";
import { Hint } from "../custom/hint";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

export const NoteButton = () => {
  return (
    <div className="fixed bottom-10 right-10">
      <Dialog>
        <Hint label="Notepad" side="top" sideOffset={10}>
          <DialogTrigger asChild>
            <Button
              className="h-10 w-10 rounded-full"
              variant={"custom"}
              size={"icon"}
            >
              <Pencil className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </Hint>
        <DialogContent className="max-w-[1000px] ">
          <DialogHeader className="text-xl font-bold">Notes</DialogHeader>
          <div className="w-full h-[400px] flex flex-row justify-start">
            <div className="h-full w-1/5 px-4 border-r-[2px]">Notes name</div>
            <div className="h-full w-4/5 px-4 border-r-[2px]">Note content</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

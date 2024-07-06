import { Pencil } from "lucide-react";
import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import { Note } from "../note";
import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

export const NoteOptionButton = () => {
  return (
    <div className="fixed bottom-10 right-10 ">
      <Sheet>
        <Hint label="Notepad" side="top" sideOffset={10}>
          <SheetTrigger asChild>
            <Button
              className="h-10 w-10 rounded-full"
              variant={"custom"}
              size={"icon"}
            >
              <Pencil className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </Hint>
        <SheetContent className="max-w-[800px] w-full h-full">
          <SheetTitle className="text-xl font-bold">Notes</SheetTitle>
          <Note />
        </SheetContent>
      </Sheet>
    </div>
  );
};

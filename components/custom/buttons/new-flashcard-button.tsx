import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { NotebookPen } from "lucide-react";

export const NewFlashcardButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <NotebookPen className="h-4 w-4 mr-2" />
        <span> Flashcard</span>
      </DialogTrigger>
      <DialogContent>adsfaf</DialogContent>
    </Dialog>
  );
};

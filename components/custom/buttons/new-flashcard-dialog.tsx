import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useCreateDialogStore from "@/stores/useCreateDialogStore";
import { NotebookPen } from "lucide-react";

export const NewFlashcardDialog = () => {
  const { isOpenCreateDialog, setIsOpenCreateDialog } = useCreateDialogStore();
  return (
    <Dialog onOpenChange={setIsOpenCreateDialog} open={isOpenCreateDialog}>
      <DialogTrigger asChild>
        <NotebookPen className="h-4 w-4 mr-2" />
        <span> Flashcard</span>
      </DialogTrigger>
      <DialogContent>adsfaf</DialogContent>
    </Dialog>
  );
};

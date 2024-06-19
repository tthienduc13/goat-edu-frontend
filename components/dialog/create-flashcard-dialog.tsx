import { CreateFlashcardForm } from "@/app/(platform)/flashcards/new/_components/create-flashcard-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateDialogStore from "@/stores/useCreateDialogStore";

export const CreateFlashcardDialog = () => {
  const { isOpenCreateDialog, setIsOpenCreateDialog } = useCreateDialogStore();
  return (
    <Dialog open={isOpenCreateDialog} onOpenChange={setIsOpenCreateDialog}>
      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle>New flashcard sets</DialogTitle>
          <DialogDescription>
            Start by enter the title, description and choose the related subject
          </DialogDescription>
        </DialogHeader>
        <CreateFlashcardForm />
      </DialogContent>
    </Dialog>
  );
};

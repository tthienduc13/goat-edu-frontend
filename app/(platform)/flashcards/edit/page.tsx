"use client";

import { Eraser, Pencil } from "lucide-react";
import { EditFlashcardContentForm } from "./_components/edit-flashcard-content-form";
import { EditFlashcardForm } from "./_components/edit-flashcard-form";
import { Button } from "@/components/ui/button";
import { MoreButton } from "@/components/custom/buttons/more-button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useSaveStatusStore from "@/stores/useSaveStatusStore";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteFlashcard } from "@/app/api/flashcard/flashcard.query";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const EditFlashcardPage = () => {
  const user = useCurrentUser();
  const { saveStatus } = useSaveStatusStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { mutate: deleteFlashcard, isSuccess } = useDeleteFlashcard({
    token: user?.token!,
  });

  if (!id) {
    notFound();
  }

  if (isSuccess) {
    router.push("/personal");
  }
  return (
    <div className="flex  relative w-full  flex-col gap-y-10 p-8 min-h-[calc(100vh-64px)]">
      <div className="left-0 px-5 py-4 rounded-lg border-[2px] shadow-lg w-full justify-between flex items-center">
        <div className="flex flex-col gap-y-1">
          <div className="w-full flex flex-row items-center gap-x-2">
            <Pencil className="w-4 h-4" />
            <div className="text-xl font-semibold">Edit set</div>
          </div>
          <div className="text-sm text-muted-foreground">{saveStatus}</div>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Button className="w-fit"> Done</Button>
          <MoreButton>
            <DropdownMenuItem onClick={() => deleteFlashcard({ id: id })}>
              <Eraser className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </MoreButton>
        </div>
      </div>
      <EditFlashcardForm id={id} token={user?.token!} />
      <EditFlashcardContentForm id={id} token={user?.token!} />
    </div>
  );
};

export default EditFlashcardPage;

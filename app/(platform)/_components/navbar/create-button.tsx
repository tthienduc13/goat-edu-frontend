"use client";

import { Hint } from "@/components/custom/hint";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCreateDialogStore from "@/stores/useCreateDialogStore";

import { MessageSquareMore, NotebookPen, Plus } from "lucide-react";

export const CreateButton = () => {
  const { setIsOpenCreateDialog } = useCreateDialogStore();
  const handleCreateDiscussion = () => {
    alert("create discussion");
  };

  return (
    <>
      <DropdownMenu>
        <Hint label="Create" sideOffset={10}>
          <DropdownMenuTrigger asChild>
            <Button className="h-10 w-10" variant="custom" size="icon">
              <Plus />
            </Button>
          </DropdownMenuTrigger>
        </Hint>
        <DropdownMenuContent sideOffset={10} align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsOpenCreateDialog(true)}>
              <NotebookPen className="h-4 w-4 mr-2" />
              <span> Flashcard</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCreateDiscussion}>
              <MessageSquareMore className="h-4 w-4 mr-2" />
              <span> Discussion</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

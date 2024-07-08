"use client";

import { Hint } from "@/components/custom/hint";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCreateButtonStore from "@/stores/useCreateButtonStore";
import useCreateDialogStore from "@/stores/useCreateDialogStore";

import { GalleryHorizontalEnd, MessageSquareMore, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateButton = () => {
  const router = useRouter();
  const { setIsOpenCreateDialog } = useCreateDialogStore();
  const { isOpenCreateButton, setIsOpenCreateButton } = useCreateButtonStore();
  const handleCreateDiscussion = () => {
    router.replace("/discussed/new");
    setIsOpenCreateButton(false);
  };

  return (
    <DropdownMenu
      onOpenChange={setIsOpenCreateButton}
      open={isOpenCreateButton}
    >
      <Hint label="Create" sideOffset={10}>
        <DropdownMenuTrigger asChild>
          <Button className="h-10 w-10" variant="custom" size="icon">
            <Plus />
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent sideOffset={10} align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setIsOpenCreateDialog(true);
              setIsOpenCreateButton(false);
            }}
          >
            <GalleryHorizontalEnd className="h-4 w-4 mr-2" />
            <span> Flashcard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateDiscussion}>
            <MessageSquareMore className="h-4 w-4 mr-2" />
            <span> Discussion</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquareMore, NotebookPen, Plus } from "lucide-react";

export const CreateButton = () => {
  const handleCreateFlashcards = () => {
    alert("create flashcard");
  };

  const handleCreateDiscussion = () => {
    alert("create discussion");
  };

  return (
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
          <DropdownMenuItem
            onClick={handleCreateFlashcards}
            className="flex items-center"
          >
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
  );
};

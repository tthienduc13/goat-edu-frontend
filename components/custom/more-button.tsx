import { Ellipsis } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MoreButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full h-7 w-7" size="icon" variant="ghost">
          <Ellipsis className="w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        adfdasf
        {/* TODO: add children */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

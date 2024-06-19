import { Command } from "lucide-react";

import { Hint } from "@/components/custom/hint";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Shorcuts = [
  { title: "Add card", shortcuts: ["Command", "Shift", "R"] },
  { title: "Next side or card", shortcuts: ["Tab"] },
];

export const KeyBoardShorcuts = () => {
  return (
    <Dialog>
      <Hint label="Keyboard shortcuts" side="bottom" sideOffset={10}>
        <DialogTrigger>
          <div className={cn(buttonVariants({ size: "icon" }))}>
            <Command className="w-4 h-4" />
          </div>
        </DialogTrigger>
      </Hint>
      <DialogContent className="w-[500px]">
        <DialogTitle className="text-xl">Keyboard shortcuts</DialogTitle>
        <div className="flex flex-col w-full divide-y-[2px]">
          {Shorcuts.map((shortcut, index) => (
            <div
              key={index}
              className="py-4 flex flex-row justify-between items-center"
            >
              <span className="text-base font-medium">{shortcut.title}</span>
              <div className="flex flex-row gap-x-1">
                {shortcut.shortcuts.map((key, keyIndex) => (
                  <Badge key={keyIndex} variant={"secondary"}>
                    {key === "Command" ? <Command className="h-3 w-3" /> : key}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

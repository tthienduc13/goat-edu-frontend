import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

export const SettingButton = () => {
  return (
    <Dialog>
      <Hint label="Settings" side="bottom" sideOffset={10}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
      </Hint>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>Settings</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

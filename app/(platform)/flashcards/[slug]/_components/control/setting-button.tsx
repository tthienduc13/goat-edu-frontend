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
      <DialogTrigger asChild>
        <Button id="onborda-step6" size={"lg"} variant={"ghost"}>
          <Settings className="w-5 h-5 mr-2" />
          <div className="text-base">Setttings</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>Settings</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

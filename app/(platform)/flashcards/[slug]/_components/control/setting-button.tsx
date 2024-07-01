import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Command, Settings } from "lucide-react";

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
        <div className="flex flex-col  divide-y-[1px]">
          <div className="flex flex-row py-5">
            <div className="text-base font-semibold">Front</div>
          </div>
          <div className="py-5 flex flex-col gap-y-4">
            <div className="text-base font-semibold">Keyboard shortcuts</div>
            <div className="flex flex-row flex-wrap gap-y-4">
              <div className="w-1/2 p-2 border-b-[1px] flex flex-row justify-between items-center">
                <div className="font-light">Previous</div>
                <Button variant={"secondary"} size={"icon"} className="">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-1/2 p-2 border-b-[1px] flex flex-row justify-between items-center">
                <div className="font-light">Next</div>
                <Button variant={"secondary"} size={"icon"} className="">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-1/2 p-2 flex flex-row justify-between items-center">
                <div className="font-light">Flip</div>
                <Button variant={"secondary"} className="">
                  Space
                </Button>
              </div>
              <div className="w-1/2 p-2 flex flex-row justify-between items-center">
                <div className="font-light">Shuffle</div>
                <Button variant={"secondary"} className="">
                  <Command className="h-4 w-4 mr-2" /> H
                </Button>
              </div>
            </div>
          </div>
          <div className="text-destructive py-5 hover:opacity-80 cursor-pointer font-semibold">
            Restart flashcards
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

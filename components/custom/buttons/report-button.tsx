import { Bug } from "lucide-react";

import { Hint } from "@/components/custom/hint";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReportForm } from "@/components/forms/report-form";

export const ReportButton = () => {
  return (
    <Dialog>
      <Hint label="Report issue" side="top" sideOffset={10}>
        <DialogTrigger asChild>
          <Button className="h-10 w-10" variant="ghost" size="icon">
            <Bug className="w-4 h-4" />
          </Button>
        </DialogTrigger>
      </Hint>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report a problem</DialogTitle>
          <DialogDescription>
            Don&apos;t hesistate to send us a report. It helps us to improve the
            user experience
          </DialogDescription>
        </DialogHeader>
        <ReportForm />
      </DialogContent>
    </Dialog>
  );
};

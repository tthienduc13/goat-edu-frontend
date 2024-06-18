import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ReportForm } from "@/components/forms/report-form";

interface ReportDialogProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReportDialog = ({ open, setIsOpen }: ReportDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
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

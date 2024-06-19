import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ReportForm } from "@/components/forms/report-form";
import useReportDialogStore from "@/stores/useReportDialogStore";

export const ReportDialog = () => {
  const { isOpenReportDialog, setIsOpenReportDialog } = useReportDialogStore();
  return (
    <Dialog open={isOpenReportDialog} onOpenChange={setIsOpenReportDialog}>
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

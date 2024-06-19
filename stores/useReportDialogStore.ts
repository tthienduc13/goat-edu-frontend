import { create } from "zustand";

interface ReportDialogState {
  isOpenReportDialog: boolean;
  setIsOpenReportDialog: (isOpen: boolean) => void;
}

const useReportDialogStore = create<ReportDialogState>((set) => ({
  isOpenReportDialog: false,
  setIsOpenReportDialog: (isOpen: boolean) =>
    set({ isOpenReportDialog: isOpen }),
}));

export default useReportDialogStore;

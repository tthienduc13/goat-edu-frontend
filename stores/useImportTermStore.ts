import { create } from "zustand";

interface ImportTermsStore {
  isImportTermsOpen: boolean;
  setIsImportTermsOpen: (isImportTermsOpen: boolean) => void;
}

const useImportTermsStore = create<ImportTermsStore>((set) => ({
  isImportTermsOpen: false,
  setIsImportTermsOpen: (isOpen: boolean) => set({ isImportTermsOpen: isOpen }),
}));

export default useImportTermsStore;

import { create } from "zustand";

interface CreateDialogState {
  isOpenCreateDialog: boolean;
  setIsOpenCreateDialog: (isOpenCreateDialog: boolean) => void;
}

const useCreateDialogStore = create<CreateDialogState>((set) => ({
  isOpenCreateDialog: false,
  setIsOpenCreateDialog: (isOpen: boolean) =>
    set({ isOpenCreateDialog: isOpen }),
}));

export default useCreateDialogStore;

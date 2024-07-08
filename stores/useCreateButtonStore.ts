import { create } from "zustand";

interface CreateButtonState {
  isOpenCreateButton: boolean;
  setIsOpenCreateButton: (isOpenCreateButton: boolean) => void;
}

const useCreateButtonStore = create<CreateButtonState>((set) => ({
  isOpenCreateButton: false,
  setIsOpenCreateButton: (isOpen: boolean) =>
    set({ isOpenCreateButton: isOpen }),
}));

export default useCreateButtonStore;

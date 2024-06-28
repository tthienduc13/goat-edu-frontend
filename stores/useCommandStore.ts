import { create } from "zustand";

interface CommandMenuStore {
  isOpenCommandMenu: boolean;
  setIsOpenCommandMenu: (isOpenCommandMenu: boolean) => void;
  toggleCommandMenu: () => void;
}

const useCommandStore = create<CommandMenuStore>((set) => ({
  isOpenCommandMenu: false,
  setIsOpenCommandMenu: (isOpenCommandMenu: boolean) =>
    set({ isOpenCommandMenu }),
  toggleCommandMenu: () =>
    set((state) => ({ isOpenCommandMenu: !state.isOpenCommandMenu })),
}));

export default useCommandStore;

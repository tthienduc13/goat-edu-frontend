import { create } from "zustand";

interface MobileNavState {
  isOpenMobileNav: boolean;
  setIsOpenMobileNav: (isOpenMobileNave: boolean) => void;
}

const useMobileNavStore = create<MobileNavState>((set) => ({
  isOpenMobileNav: false,
  setIsOpenMobileNav: (isOpen: boolean) => set({ isOpenMobileNav: isOpen }),
}));

export default useMobileNavStore;

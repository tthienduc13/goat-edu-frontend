import { create } from "zustand";

interface PlatformMobileNavState {
  isPlatformOpenMobileNav: boolean;
  setIsPlatformOpenMobileNav: (isPlatformOpenMobileNave: boolean) => void;
}

const usePlatformMobileNavStore = create<PlatformMobileNavState>((set) => ({
  isPlatformOpenMobileNav: false,
  setIsPlatformOpenMobileNav: (isOpen: boolean) =>
    set({ isPlatformOpenMobileNav: isOpen }),
}));

export default usePlatformMobileNavStore;

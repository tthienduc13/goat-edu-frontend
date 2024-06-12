import create from "zustand";

interface SaveStatusState {
  saveStatus: string;
  setSaveStatus: (status: string) => void;
}

const useSaveStatusStore = create<SaveStatusState>((set) => ({
  saveStatus: "Saved",
  setSaveStatus: (status) => set({ saveStatus: status }),
}));

export default useSaveStatusStore;

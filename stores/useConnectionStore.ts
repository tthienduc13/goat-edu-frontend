import { create } from "zustand";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

interface ConnectionState {
  connection: HubConnection | null;
  setConnection: (connection: HubConnection) => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  connection: null,
  setConnection: (connection) => set({ connection }),
}));

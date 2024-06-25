import { create } from "zustand";

export const useGuruDataStore = create((set) => ({
  guru: [],
  toggle: () => set((guruData) => ({ guru: guruData })),
}));

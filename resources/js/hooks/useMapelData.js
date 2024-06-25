import { create } from "zustand";

export const useMapelDataStore = create((set) => ({
  mapel: [],
  toggle: () => set((mapelData) => ({ mapel: mapelData })),
}));

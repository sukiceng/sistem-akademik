import { create } from "zustand";

export const useKelasDataStore = create((set) => ({
  kelas: [],
  toggle: () => set((kelasData) => ({ kelas: kelasData })),
}));

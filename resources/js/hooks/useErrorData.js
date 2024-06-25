import { create } from "zustand";

export const useErrorDataStore = create((set) => ({
  error: [],
  success: [],
  toggle: (errorData, successData) => set(() => ({ error: errorData, success: successData })),
}));


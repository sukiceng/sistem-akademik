import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  updateUserData: (userData) => set(() => ({ user: userData })),
}));

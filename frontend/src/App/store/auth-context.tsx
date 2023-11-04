import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  currentUserId: number | null;
  setCurrentUserId: (currentUserId: number) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  currentUserId: null,
  setCurrentUserId: (currentUserId: number) => set({ currentUserId }),
}));

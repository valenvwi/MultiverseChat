import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  currentUserId: number | null;
  setCurrentUserId: (currentUserId: number | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  currentUserId: null,
  setCurrentUserId: (currentUserId: number | null) => set({ currentUserId }),
}));

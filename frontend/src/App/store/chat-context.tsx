import { create } from "zustand";

type ChatState = {
  chatroomId: number | null;
  setChatroomId: (chatroomId: number | null) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  chatroomId: null,
  setChatroomId: (chatroomId) => set({ chatroomId }),
}));

import { create } from "zustand";

type ChatState = {
  chatroomId: number;
  setChatroomId: (chatroomId: number) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  chatroomId: 0,
  setChatroomId: (chatroomId: number) => set({ chatroomId }),
}));

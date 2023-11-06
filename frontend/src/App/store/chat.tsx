import { create } from "zustand";
import { ChatroomsListType } from "../../types/chatroom";


type ChatState = {
  chatroom: ChatroomsListType | null;
  setChatroom: (chatroom: ChatroomsListType | null) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  chatroom: null,
  setChatroom: (chatroom) => set({ chatroom }),
}));

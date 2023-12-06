import { MessageType } from "./message";

export interface ChatroomsListType {
  id: number;
  owner: {
    id: number;
    username: string;
  };
  participant: {
    id: number;
    username: string;
  };
  ownerLastReadMsg: MessageType;
  participantLastReadMsg: MessageType;
}

export interface ChatroomsListData {
  id: number;
  owner: {
    id: number;
    username: string;
  };
  participant: {
    id: number;
    username: string;
  };
  owner_last_read_message: MessageType;
  participant_last_read_message: MessageType;
}

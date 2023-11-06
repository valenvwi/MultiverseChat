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
}

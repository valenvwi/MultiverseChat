import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { BASEURL } from "../../config";
import { useState } from "react";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";
import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser";

type ChatroomsListProps = {
  onChangeChatroom: (chatId: number) => void;
};

type ChatroomsListType = {
  id: number;
  owner: number;
  participant: number;
};

const ChatroomsList: React.FC<ChatroomsListProps> = ({ onChangeChatroom }) => {
  const [chatList, setChatList] = useState<ChatroomsListType>([]);
  const jwtAxios = useAxiosWithJwtInterceptor();
  const currentUser = useFetchCurrentUser();

  const fetchChatroomList = async () => {
    try {
      const response = await jwtAxios.get(`${BASEURL}/chatrooms/`, {
        withCredentials: true,
      });
      const chatrooms = response.data;
      setChatList(chatrooms);
      console.log(chatrooms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatroomList();
  }, []);

  return (
    <>
      <ListItem sx={{ mt: 1 }}>
        <Typography sx={{ fontWeight: 700 }}>ChatList</Typography>
      </ListItem>
      {chatList.map((chat) => (
        <ListItem key={chat.id} disablePadding>
          <ListItemButton onClick={() => onChangeChatroom(chat.id)}>
            <ListItemText>
              {chat.owner.id === currentUser?.id
                ? chat.participant.username
                : chat.owner.username}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

export default ChatroomsList;

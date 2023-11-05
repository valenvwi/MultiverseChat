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
import { useChatStore } from "../store/chat-context";
import styled from "@mui/material/styles/styled";
import { List } from "@mui/material";
import { Chat } from "@mui/icons-material";
import ChatroomListItem from "./ChatroomListItem";

type ChatroomsListType = {
  id: number;
  owner: number;
  participant: number;
};

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  border: "1px solid rgba(0, 0, 0, 0.12)",
  flexShrink: 0,
  flexGrow: 1,
  overflowY: "auto",
}));

const ChatroomsList = () => {
  const setChatroomId = useChatStore((state) => state.setChatroomId);

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
      <StyledList>
        <ListItem sx={{ mt: 1 }}>
          <Typography sx={{ fontWeight: 700, margin: "10px auto" }}>
            All Chats
          </Typography>
        </ListItem>
        {chatList.map((chat) => (
          <ListItem key={chat.id} disablePadding>
            <ChatroomListItem
              key={chat.id}
              chatroom={chat}
              userId={
                chat.owner.id === currentUser?.id
                  ? chat.participant.id
                  : chat.owner.id
              }
            />
          </ListItem>
        ))}
      </StyledList>
    </>
  );
};

export default ChatroomsList;

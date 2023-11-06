import {
  Avatar,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useChatStore } from "../../store/chat";
import { useEffect } from "react";
import { BASEURL } from "../../../config";
import { useState } from "react";
import useAxiosWithJwtInterceptor from "../../../helpers/jwtinterceptor";
import useFetchUser from "../../../Utils/useFetchUser";

type Props = {
  chatroom: {
    id: number;
    owner: {
      id: number;
      username: string;
    };
    participant: {
      id: number;
      username: string;
    };
  };
  userId: number;
};

const ChatroomListItem = ({ chatroom, userId }: Props) => {
  const setChatroom = useChatStore((state) => state.setChatroom);
  const [lastMessage, setLastMessage] = useState<string>("");
  const jwtAxios = useAxiosWithJwtInterceptor();
  const user = useFetchUser(userId);

  useEffect(() => {
    const fetchMessages = async (chatroomId: number) => {
      try {
        const response = await jwtAxios.get(
          `${BASEURL}/messages/?chatroom_id=${chatroomId}`
        );
        setLastMessage(response.data[response.data.length - 1].content);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(chatroom.id);
  }, []);

  return (
    <>
      <ListItemButton onClick={() => setChatroom(chatroom)}>
        <Avatar
          src={user?.avatar}
          sx={{ width: "88px", height: "88px", mx: 1, my: 1 }}
        />
        <Box>
          <ListItemText>{user?.firstName}</ListItemText>
          <Typography
            variant="subtitle2"
            textAlign="start"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {lastMessage}
          </Typography>
        </Box>
      </ListItemButton>
      ;
    </>
  );
};

export default ChatroomListItem;

import {
  Avatar,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useChatStore } from "../store/chat";
import { useEffect } from "react";
import { BASEURL } from "../../config";
import axios from "axios";
import { useState } from "react";
import { UserProfileProps } from "../../types/userProfile";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";

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
  const setChatroomId = useChatStore((state) => state.setChatroomId);
  const [user, setUser] = useState<UserProfileProps>();
  const [lastMessage, setLastMessage] = useState<string>("");
  const jwtAxios = useAxiosWithJwtInterceptor();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASEURL}/users/${userId}/`, {
          withCredentials: true,
        });
        const userDetails = response.data;
        const userProfile: UserProfileProps = {
          firstName: userDetails.first_name,
          lastName: userDetails.last_name,
          location: userDetails.location,
          avatar: userDetails.avatar,
          nativeLanguage: userDetails.native_language,
          targetLanguage: userDetails.target_language,
          bio: userDetails.bio,
          id: userDetails.id,
        };
        setUser(userProfile);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <ListItemButton onClick={() => setChatroomId(chatroom.id)}>
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

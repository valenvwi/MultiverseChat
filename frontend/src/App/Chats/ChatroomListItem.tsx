import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useChatStore } from "../store/chat-context";
import { useEffect } from "react";
import { BASEURL } from "../../config";
import axios from "axios";
import { useState } from "react";
import { UserProfileProps } from "../../types/userProfile";
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
  },
  userId: number;
};


const ChatroomListItem = ({ chatroom, userId }: Props) => {
  const setChatroomId = useChatStore((state) => state.setChatroomId);
  const [user, setUser] = useState<UserProfileProps>();

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
        console.log("User profile: ", userProfile)
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <ListItemButton onClick={() => setChatroomId(chatroom.id)}>
        <Avatar src={user?.avatar} sx={{ width: "88px", height: "88px", mx: 3, my: 1 }}/>
        <ListItemText>
          {user?.firstName}
        </ListItemText>
      </ListItemButton>
      ;
    </>
  );
};

export default ChatroomListItem;

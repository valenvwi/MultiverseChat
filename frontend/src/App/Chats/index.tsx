import { useState } from "react";
import ChatroomsList from "./ChatroomList";
import Chatroom from "./Chatroom";
import { useTheme, useMediaQuery } from "@mui/material";
import AppBottomNavBar from "../UI/AppBottomNavBar";

const Chats = () => {
  const [chatroomId, setChatroomId] = useState<number>();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const changeChatroom = (chatroomId: number) => {
    setChatroomId(chatroomId);
    console.log(`Using changeChatroom: ${chatroomId}`);
  };

  return (
    <>
      <ChatroomsList onChangeChatroom={changeChatroom} />
      {chatroomId && <Chatroom chatroomId={chatroomId} />}
      {!isBigScreen && <AppBottomNavBar />}
    </>
  );
};

export default Chats;

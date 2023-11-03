import { useState } from "react";
import ChatroomsList from "./ChatroomList";
import Chatroom from "./Chatroom";


const Chats = () => {
  const [chatroomId, setChatroomId] = useState<number>();

  const changeChatroom = (chatroomId: number) => {
    setChatroomId(chatroomId);
    console.log(`Using changeChatroom: ${chatroomId}`);
  };


  return (
    <>
      <ChatroomsList onChangeChatroom={changeChatroom} />
      {chatroomId && <Chatroom chatroomId={chatroomId} />}
    </>
  );
};

export default Chats;

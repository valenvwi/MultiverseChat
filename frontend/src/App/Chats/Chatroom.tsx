import { Button, TextField, styled } from "@mui/material";
import { useState } from "react";
import { BASEURL, WS_ROOT } from "../../config";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";
import useWebSocket from "react-use-websocket";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import { useChatStore } from "../store/chat";
import SendIcon from "@mui/icons-material/Send";

type MessagesProps = {
  id: number;
  content: string;
  sender: number;
};

const Container = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  gap: "16px",
});

const MessagesContainer = styled("div")({
  flexGrow: 1,
  height: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const InputContainer = styled("div")({
  display: "flex",
  // gap: "16px",
});

const Chatroom = () => {
  const chatroomId = useChatStore((state) => state.chatroomId);

  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const jwtAxios = useAxiosWithJwtInterceptor();
  const socketUrl = `${WS_ROOT}/${chatroomId}/`;

  const fetchMessages = async (chatroomId: number) => {
    try {
      const response = await jwtAxios.get(
        `${BASEURL}/messages/?chatroom_id=${chatroomId}`
      );
      setMessages(response.data);
      console.log("Using fetchMessages: ", { response });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      fetchMessages(chatroomId);
    },
    onMessage: (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((oldMessages) => [...oldMessages, newMessage.new_message]);
      console.log("Using onMessage: ", { newMessage });
    },
  });

  const sendMessage = () => {
    sendJsonMessage({
      chatroom_id: chatroomId,
      content: inputMessage,
    });
    setInputMessage("");
  };

  return (
    <Container>
      <ChatHeader />
      <MessagesContainer>
        {messages.map((message: MessagesProps) => (
          <Message
            key={message.id}
            content={message.content}
            sender={message.sender}
          />
        ))}
      </MessagesContainer>

      <InputContainer>
        <TextField
          sx={{ flexGrow: 1, backgroundColor: "white", my: 2 }}
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (inputMessage) {
                sendMessage();
              }
            }
          }}
        />

        <Button onClick={sendMessage} disabled={!inputMessage}>
          {<SendIcon />}
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Chatroom;

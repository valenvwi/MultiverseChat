import { Button, TextField, Typography, styled } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { BASEURL, WS_ROOT } from "../../../config";
import useAxiosWithJwtInterceptor from "../../../helpers/jwtinterceptor";
import useWebSocket from "react-use-websocket";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import { useAuthStore } from "../../store/auth";
import SendIcon from "@mui/icons-material/Send";
import { ChatroomsListType } from "../../../types/chatroom";
import { MessageType } from "../../../types/message";

const Container = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
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

const Chatroom = ({ chatroom }: { chatroom: ChatroomsListType }) => {
  const chatroomId = chatroom.id;
  const currentUserId = useAuthStore((state) => state.currentUserId);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const jwtAxios = useAxiosWithJwtInterceptor();
  const socketUrl = `${WS_ROOT}/${chatroomId}/`;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async (chatroomId: number) => {
    try {
      const response = await jwtAxios.get(
        `${BASEURL}/messages/?chatroom_id=${chatroomId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      if (chatroomId) {
        fetchMessages(chatroomId);
      }
    },
    onMessage: (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((oldMessages) => [...oldMessages, newMessage.new_message]);
    },
  });

  const sendMessage = () => {
    sendJsonMessage({
      chatroom_id: chatroomId,
      content: inputMessage,
    });
    setInputMessage("");
  };

  function getMessageDate(timestamp: string) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <Container>
      <ChatHeader
        userId={
          currentUserId === chatroom.owner.id
            ? chatroom.participant.id
            : chatroom.owner.id
        }
      />
      <MessagesContainer>
        {messages.map((message, index) => (
          <>
            {getMessageDate(message.timestamp) !==
              (index === 0
                ? null
                : getMessageDate(messages[index - 1].timestamp)) && (
              <Typography
                variant="subtitle2"
                sx={{ textAlign: "center", mb: 3 }}
              >
                {getMessageDate(message.timestamp)}
              </Typography>
            )}

            <Message
              key={message.id}
              content={message.content}
              sender={message.sender}
              currentUserId={currentUserId ? currentUserId : 0}
              timestamp={message.timestamp}
            />
          </>
        ))}
        <div ref={messagesEndRef}></div>
      </MessagesContainer>

      <InputContainer sx={{ ml: "15px" }}>
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

import { Button, Container, TextField, styled } from "@mui/material";
import { useState } from "react";
import { BASEURL, WS_ROOT } from "../../config";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";
import useWebSocket from "react-use-websocket";


type MessagesProps = {
  id?: number;
  content?: string;
  sender?: number;
};


const InputContainer = styled("div")({
  display: "flex",
  gap: "16px",
});

const Chatroom = ({ chatroomId }: { chatroomId: number }) => {
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
      setMessages((oldMessages) =>[...oldMessages, newMessage.new_message]);
      console.log("Using onMessage: ",{newMessage});
    },
  });

  // const sendMessage = async () => {
  //   setMessages([
  //     ...messages,
  //     {
  //       content: inputMessage,
  //     },
  //   ]);
  //   setInputMessage("");

  //   try {
  //     setTimeout(async () => {
  //       try {
  //         const response = await jwtAxios.post(`${BASEURL}/messages/`, {
  //           chatroom_id: chatroomId || undefined,
  //           content: inputMessage,
  //         });
  //         console.log(response);

  //         fetchMessages(chatroomId);
  //       } catch (error) {
  //         console.error("Error sending message:", error);
  //         setMessages([
  //           ...messages,
  //           {
  //             content:
  //               "Sorry, I'm having trouble communicating with the server. 😔",
  //           },
  //         ]);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  const sendMessage = () => {
    sendJsonMessage({
      chatroom_id: chatroomId,
      content: inputMessage,
    });
    setInputMessage("");
  };


  return (
    <Container>
      {messages.map((message: MessagesProps) => (
        <div key={message.id}>
          <div>{message.content}</div>
        </div>
      ))}
      <InputContainer>
        <TextField
          sx={{ flexGrow: 1, backgroundColor: "white" }}
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

        <Button onClick={sendMessage} disabled={!inputMessage} />
      </InputContainer>
    </Container>
  );
};

export default Chatroom;

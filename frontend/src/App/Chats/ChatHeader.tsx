import { Box, Button } from "@mui/material";
import { useChatStore } from "../store/chat-context";

const ChatHeader = () => {
  const setChatroomId = useChatStore((state) => state.setChatroomId);
  
  const backToChatrooms = () => {
    setChatroomId(0);
  }
  return (
    <Box>
      <Button onClick={backToChatrooms}>Back</Button>
    </Box>
  )
};

export default ChatHeader;

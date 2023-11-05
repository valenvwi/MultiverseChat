import { Box, Button } from "@mui/material";
import { useChatStore } from "../store/chat-context";

const ChatHeader = () => {
  const setChatroomId = useChatStore((state) => state.setChatroomId);

  const backToChatrooms = () => {
    setChatroomId(null);
  };
  return (
    <Box>
      <Button onClick={backToChatrooms}>Back</Button>
    </Box>
  );
};

export default ChatHeader;

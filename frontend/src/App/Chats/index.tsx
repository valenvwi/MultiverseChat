import ChatroomsList from "./ChatroomList";
import Chatroom from "./Chatroom";
import { useTheme, useMediaQuery, Grid, Box } from "@mui/material";
import AppBottomNavBar from "../UI/AppBottomNavBar";
import { useChatStore } from "../store/chat-context";

const Chats = () => {
  const chatroomId = useChatStore((state) => state.chatroomId);

  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  console.log("ChatroomId: ", chatroomId);

  return (
    <>
      <Grid container spacing={2}>
        {chatroomId !== 0 ? (
          <Box
            component={Grid}
            item
            xs={12}
            md={4}
            display={{ xs: "none", md: "block" }}
          >
            <ChatroomsList />
          </Box>
        ) : (
          <Box
            component={Grid}
            item
            xs={12}
            md={4}
            display={{ xs: "block", md: "block" }}
          >
            <ChatroomsList />
          </Box>
        )}

        {chatroomId !== 0 ? (
          <Box
            component={Grid}
            item
            xs={12}
            md={8}
            display={{ xs: "block", md: "block" }}
          >
            {chatroomId && <Chatroom />}
          </Box>
        ) : (
          <Box
            component={Grid}
            item
            xs={12}
            md={8}
            display={{ xs: "none", md: "block" }}
          >
            {chatroomId && <Chatroom />}
          </Box>
        )}
        {!isBigScreen && <AppBottomNavBar />}
      </Grid>
    </>
  );
};

export default Chats;

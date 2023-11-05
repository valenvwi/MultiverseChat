import ChatroomsList from "./ChatroomList";
import Chatroom from "./Chatroom";
import { useTheme, useMediaQuery, Grid } from "@mui/material";
import AppBottomNavBar from "../UI/AppBottomNavBar";
import { useChatStore } from "../store/chat-context";

const Chats = () => {
  const chatroomId = useChatStore((state) => state.chatroomId);

  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  console.log("ChatroomId: ", chatroomId);

  if (isBigScreen) {
    return (
      <>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item md={4} sx={{ display: "flex" }}>
            <ChatroomsList />
          </Grid>

          <Grid item md={8} sx={{ display: "flex", flex: "1" }}>
            {chatroomId && <Chatroom key={chatroomId} />}
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container sx={{ flexGrow: 1, flexDirection: "column " }}>
        <Grid item sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          {chatroomId === null ? <ChatroomsList /> : <Chatroom />}
        </Grid>

        <AppBottomNavBar />
      </Grid>
    </>
  );
};

export default Chats;

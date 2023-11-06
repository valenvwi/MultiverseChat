import ChatroomsList from "./ChatroomList";
import Chatroom from "./Chatroom";
import { useTheme, useMediaQuery, Grid, Typography } from "@mui/material";
import AppBottomNavBar from "../UI/AppBottomNavBar";
import { useChatStore } from "../store/chat";

const Chats = () => {
  const chatroom = useChatStore((state) => state.chatroom);

  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  console.log("Chatroom: ", chatroom);

  if (isBigScreen) {
    return (
      <>
        <Grid container sx={{ flexGrow: 1, height: 0 }}>
          <Grid item md={4} sx={{ display: "flex", height: "100%" }}>
            <ChatroomsList />
          </Grid>

          <Grid item md={8} sx={{ display: "flex", flex: "1" }}>
            {chatroom ? (
              <Chatroom key={chatroom.id} chatroom={chatroom }/>
            ) : (
              <Typography
                component="h1"
                variant="h5"
                fontWeight={700}
                sx={{ textAlign: "center", margin: "auto" }}
              >
                Please select a chat
              </Typography>
            )}
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container sx={{ flexGrow: 1, flexDirection: "column " }}>
        <Grid item sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          {chatroom === null ? <ChatroomsList /> : <Chatroom key={chatroom.id}  chatroom={chatroom}/>}
        </Grid>

        <AppBottomNavBar />
      </Grid>
    </>
  );
};

export default Chats;

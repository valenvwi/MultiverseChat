import ChatroomsList from "./ChatroomList";
import Chatroom from "./Chatroom";
import { useTheme, useMediaQuery, Grid, Typography } from "@mui/material";
import AppBottomNavBar from "../UI/AppBottomNavBar";
import { useChatStore } from "../store/chat";
import AppTopMobileNavBar from "../UI/AppTopMobileNavBar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";

const Chats = () => {
  const chatroom = useChatStore((state) => state.chatroom);
  const setChatroom = useChatStore((state) => state.setChatroom);

  const backToChatrooms = () => {
    setChatroom(null);
  };

  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  if (isBigScreen) {
    return (
      <>
        <Grid container sx={{ flexGrow: 1, height: 0 }}>
          <Grid item md={3} sx={{ display: "flex", height: "100%" }}>
            <ChatroomsList />
          </Grid>

          <Grid item md={9} sx={{ display: "flex", flex: "1" }}>
            {chatroom ? (
              <Chatroom key={chatroom.id} chatroom={chatroom} />
            ) : (
              <Typography
                component="h1"
                variant="h5"
                fontWeight={700}
                sx={{ textAlign: "center", margin: "auto" }}
              >
                Please select a chat 🌍
              </Typography>
            )}
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        container
        sx={{ flexGrow: 1, flexDirection: "column", height: "100vh" }}
      >
        {chatroom !== null && (
          <IconButton
            onClick={backToChatrooms}
            sx={{
              position: "fixed",
              color: "white",
              left: "10px",
              top: "10px",
              zIndex: 1,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {chatroom === null ? (
          <AppTopMobileNavBar title="All Chats" />
        ) : (
          <AppTopMobileNavBar title="chatroom" />
        )}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            overflowY: "auto",
          }}
        >
          {chatroom === null ? (
            <ChatroomsList />
          ) : (
            <Chatroom key={chatroom.id} chatroom={chatroom} />
          )}
        </Grid>

        <AppBottomNavBar />
      </Grid>
    </>
  );
};

export default Chats;

import {
  Button,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { BASEURL } from "../../../config";
import useAxiosWithJwtInterceptor from "../../../helpers/jwtinterceptor";
import { useFetchCurrentUser } from "../../../Utils/useFetchCurrentUser";
import styled from "@mui/material/styles/styled";
import { List } from "@mui/material";
import ChatroomListItem from "./ChatroomListItem";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChatroomsListData, ChatroomsListType } from "../../../types/chatroom";

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  border: "1px solid rgba(0, 0, 0, 0.12)",
  flexShrink: 0,
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  width: "100%",
}));

const ChatroomsList = () => {
  const jwtAxios = useAxiosWithJwtInterceptor();
  const currentUser = useFetchCurrentUser();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const directToHome = () => {
    navigate("/");
  };

  const queryKey = ["chatrooms"];
  const queryFn = async () => {
    const response = await jwtAxios.get(`${BASEURL}/chatrooms/`, {
      withCredentials: true,
    });
    const chatroomsData: ChatroomsListData[] = response.data;
    const chatrooms: ChatroomsListType[] = chatroomsData.map((chatroom) => {
      const chatroomObj: ChatroomsListType = {
        id: chatroom.id,
        owner: chatroom.owner,
        participant: chatroom.participant,
        ownerLastReadMsg: chatroom.owner_last_read_message,
        participantLastReadMsg: chatroom.participant_last_read_message,
      };
      return chatroomObj;
    });
    return chatrooms;
  };

  const { data: chatList } = useQuery({
    queryKey,
    queryFn,
    initialData: [],
  });

  return (
    <>
      <StyledList>
        <ListItem>
          {isBigScreen && (
            <Typography sx={{ fontWeight: 700, margin: "10px auto" }}>
              All Chats
            </Typography>
          )}
        </ListItem>
        {!isBigScreen && chatList.length === 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                fontWeight={700}
                sx={{ textAlign: "center" }}
              >
                You don't have any chats yet. Start a conversation!
              </Typography>
              <Button
                onClick={directToHome}
                variant="contained"
                sx={{ mt: 3, mb: 0 }}
              >
                Explore now!
              </Button>
            </Box>
          </>
        )}
        {chatList.map((chat) => (
          <ListItem key={chat.id} disablePadding>
            <ChatroomListItem
              key={chat.id}
              chatroom={chat}
              userId={
                chat.owner.id === currentUser?.id
                  ? chat.participant.id
                  : chat.owner.id
              }
            />
          </ListItem>
        ))}
      </StyledList>
    </>
  );
};

export default ChatroomsList;

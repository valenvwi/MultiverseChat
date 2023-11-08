import {
  Avatar,
  Box,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useChatStore } from "../../store/chat";
import { BASEURL } from "../../../config";
import useAxiosWithJwtInterceptor from "../../../helpers/jwtinterceptor";
import { useFetchUser } from "../../../Utils/useFetchUser";
import { useQuery } from "@tanstack/react-query";

type Props = {
  chatroom: {
    id: number;
    owner: {
      id: number;
      username: string;
    };
    participant: {
      id: number;
      username: string;
    };
  };
  userId: number;
};

const ChatroomListItem = ({ chatroom, userId }: Props) => {
  const setChatroom = useChatStore((state) => state.setChatroom);
  const jwtAxios = useAxiosWithJwtInterceptor();
  const user = useFetchUser(userId);

  const queryKey = [`messages/${chatroom.id}`];

  const queryFn = async () => {
    const response = await jwtAxios.get(
      `${BASEURL}/messages/?chatroom_id=${chatroom.id}`
    );
    const lastMessage = response.data[response.data.length - 1].content;
    return lastMessage;
  };
  const { data: lastMessage } = useQuery({
    queryKey,
    queryFn,
    initialData: "",
  });

  return (
    <>
      <ListItemButton
        component={Paper}
        onClick={() => setChatroom(chatroom)}
        sx={{ width: "95vw" }}
      >
        <Avatar
          src={user?.avatar}
          sx={{ width: "56px", height: "56px", mx: 1, my: 1 }}
        />
        <Box sx={{ overflow: "hidden" }}>
          <ListItemText>{user?.firstName}</ListItemText>
          <Typography
            variant="subtitle2"
            textAlign="start"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {lastMessage}
          </Typography>
        </Box>
      </ListItemButton>
    </>
  );
};

export default ChatroomListItem;

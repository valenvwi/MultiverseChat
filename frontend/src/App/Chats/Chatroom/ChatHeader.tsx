import { Avatar, Box, Button, Typography } from "@mui/material";
import { useChatStore } from "../../store/chat";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import useFetchUser from "../../../Utils/useFetchUser";

const ChatHeader = ({ userId }: { userId: number }) => {
  const setChatroom = useChatStore((state) => state.setChatroom);
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  console.log("userId: " , userId)
  const user = useFetchUser(userId);

  const backToChatrooms = () => {
    setChatroom(null);
  };
  if (!isBigScreen) {
    return (
      <Box>
        <Button onClick={backToChatrooms}>Back</Button>
      </Box>
    );
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ backgroundColor: "#FFBB5C", padding: "10px" }} >
      <Avatar
          src={user?.avatar}
        />
      <Typography variant="h6" sx={{color: "white", mx: 2}} fontWeight={500}> {user?.firstName} </Typography>
    </Box>
  );
};

export default ChatHeader;

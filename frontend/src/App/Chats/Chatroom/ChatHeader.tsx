import { Avatar, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useFetchUser } from "../../../Utils/useFetchUser";

const ChatHeader = ({ userId }: { userId: number }) => {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const user = useFetchUser(userId);

  if (!isBigScreen) {
    return (
      <Box />
    );
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ backgroundColor: "#8dacff3d", padding: "10px" }} >
      <Avatar
          src={user?.avatar}
        />
      <Typography variant="h6" sx={{color: "#6C4AB6",mx: 2}} fontWeight={700}> {user?.firstName} </Typography>
    </Box>
  );
};

export default ChatHeader;

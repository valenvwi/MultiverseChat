import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useChatStore } from "../store/chat";

const AppBottomNavBar = () => {
  const setChatroom = useChatStore((state) => state.setChatroom);

  const backToChatrooms = () => {
    setChatroom(null);
  };
  return (
    <Paper elevation={3} sx={{zIndex:1}}>
      <BottomNavigation>
        <BottomNavigationAction
          onClick={backToChatrooms}
          icon={<ChatIcon />}
          component={Link}
          to="/chats"
        />
        <BottomNavigationAction
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          component={Link}
          to="/editProfile"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default AppBottomNavBar;

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const AppBottomNavBar = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 6 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Messages" icon={<ChatIcon />} />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          component={Link}
          to="/editProfile"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default AppBottomNavBar;

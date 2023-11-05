import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthServices";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { useChatStore } from "../store/chat";

const pages = [
  { name: "Find a partner", path: "/" },
  { name: "Your Chat", path: "/chats" },
];
const settings = ["Edit Profile", "Logout"];

function AppTopNavBar() {
  const { logout } = useAuth();
  const currentUser = useFetchCurrentUser();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);

  const setChatroomId = useChatStore((state) => state.setChatroomId);

  const backToChatrooms = () => {
    setChatroomId(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: string) => {
    if (setting === "Edit Profile") {
      navigate("/editProfile");
    } else if (setting === "Logout") {
      setIsLoggedIn(false);
      setCurrentUserId(null);
      logout();
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#cc6600" }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MultiverseChat
          </Typography>
          {isLoggedIn && (
            <>
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={backToChatrooms}
                    sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                    component={Link}
                    to={page.path}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={currentUser?.avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleMenuItemClick(setting)}
                    >
                      <Typography
                        textAlign="center"
                        sx={{ px: "10px", py: "5px" }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppTopNavBar;

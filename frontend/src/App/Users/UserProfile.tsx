import { Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import UserProfileProps from "../../types/userProfile";

type Props = {
  user: UserProfileProps;
};

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List>
          <ListItem>
            <img
              src={`http://127.0.0.1:8000/${user.avatar}`}
              height="400"
              width="400"
              style={{ objectFit: "cover", borderRadius: "95%" }}
            ></img>
          </ListItem>

          <ListItem>
            <ListItemText primary={user.firstName} />
            <ListItemText secondary={user.location} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Native language: ${user.nativeLanguage}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Target language: ${user.targetLanguage}`} />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default UserProfile;

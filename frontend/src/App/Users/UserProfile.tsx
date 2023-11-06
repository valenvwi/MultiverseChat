import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { UserProfileProps } from "../../types/userProfile";
import { BASEURL } from "../../config";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/chat";

type Props = {
  user: UserProfileProps;
};

const UserProfile: React.FC<Props> = ({ user }) => {
  const jwtAxios = useAxiosWithJwtInterceptor();
  const navigate = useNavigate();
  const setChatroom = useChatStore((state) => state.setChatroom);

  const createChat = async () => {
    try {
      const response = await jwtAxios.post(`${BASEURL}/chatrooms/`, {
        participant: user.id,
        withCredentials: true,
      });
      const chatroom = response.data;
      navigate("/chats");
      setChatroom(chatroom);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card
        sx={{
          mt: 4,
          margin: "0 auto",
        }}
      >
        <Grid container sx={{ spacing: { xs: 0, md: 1 } }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              src={`http://127.0.0.1:8000${user.avatar}`}
              sx={{
                width: "95%",
                margin: { xs: "10px auto", md: "0px 0px 0px 24px" },
              }}
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                aspectRatio: "1",
              }}
            ></CardMedia>
          </Grid>
          <Grid xs={12} md={8} item>
            <Box
              sx={{
                mx: 4,
                mt: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h5">{user.firstName}</Typography>
              <Typography variant="subtitle2" sx={{ ml: 2 }}>
                {user.location}
              </Typography>
            </Box>
            <Box
              sx={{
                mx: 4,
                textAlign: { xs: "center", md: "left" },
                "& > p": {
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  minHeight: "3em",
                },
              }}
            >
              <Typography variant="body2">{user.bio}</Typography>
            </Box>
            <Box
              sx={{
                mx: 4,
                mt: 2,
                textAlign: "center",
                display: { xs: "block", md: "flex" },
                justifyContent: { md: "space-between" },
              }}
            >
              <Typography variant="body1">
                Native: {user.nativeLanguage}
              </Typography>

              <Typography variant="body1">
                Learn: {user.targetLanguage}
              </Typography>
            </Box>
            <CardActions>
              <Button
                size="small"
                sx={{
                  margin: "0 auto",
                }}
                onClick={createChat}
              >
                Send a message
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default UserProfile;

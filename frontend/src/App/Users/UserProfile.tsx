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
import UserProfileProps from "../../types/userProfile";

type Props = {
  user: UserProfileProps;
};

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Card
        sx={{
          mt: 4,
          pl: 3,
          margin: "0 auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid
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
              src={`http://127.0.0.1:8000/${user.avatar}`}
              sx={{ width: "95%", mt: { xs: 4 } }}
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                aspectRatio: "1",
              }}
            ></CardMedia>
          </Grid>
          <Grid xs={12} md={8}>
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

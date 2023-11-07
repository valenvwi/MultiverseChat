import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTopMobileHeader from "./UI/AppTopMobileHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

const FinishProfileSetup = () => {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const directToHome = () => {
    navigate("/");
  };

  const firstName = localStorage.getItem("first_name");
  return (
    <>
      {!isBigScreen && <AppTopMobileHeader />}
      <Container
        component="main"
        maxWidth="md"
        sx={{ display: "flex", flexGrow: 1 }}
      >
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            fontWeight={700}
            sx={{ textAlign: "center" }}
          >
            Great {firstName}! We have your profile saved.
          </Typography>

          <Button
            onClick={directToHome}
            variant="contained"
            sx={{ mt: 4, mb: 3 }}
          >
            Explore now!
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default FinishProfileSetup;

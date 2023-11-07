import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FinishProfileSetup = () => {
  const navigate = useNavigate();

  const directToHome = () => {
    navigate("/");
  }

  const firstName = localStorage.getItem("first_name");
  return (
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

        <Button onClick={directToHome} variant="contained" sx={{ mt: 4, mb: 3 }}>
            Explore now!
        </Button>
      </Box>
    </Container>
  );
};

export default FinishProfileSetup;

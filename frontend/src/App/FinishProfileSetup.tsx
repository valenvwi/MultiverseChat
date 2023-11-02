import {
  Box,
  Button,
  Container,
  Link,
  Typography,
} from "@mui/material";

const FinishProfileSetup = () => {
  const firstName = localStorage.getItem("first_name");
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Great {firstName}! You have finished setting up your profile!
        </Typography>

        <Button type="submit" variant="contained" sx={{ mt: 4, mb: 3 }}>
          <Link href="/" color="inherit" underline="none">
            Explore now!
          </Link>
        </Button>
      </Box>
    </Container>
  );
};

export default FinishProfileSetup;

import { Box, Button, Container, Link, Typography } from "@mui/material";

const FinishProfileSetup = () => {
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

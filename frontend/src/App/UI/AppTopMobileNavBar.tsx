import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const AppTopMobileNavBar = ({title}: {title: string} ) => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              margin: "0 auto",
            }}
          >
            {title}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppTopMobileNavBar

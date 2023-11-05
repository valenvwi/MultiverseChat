import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function AppTopMobileHeader() {


  return (
    <AppBar position="static" sx={{ backgroundColor:"#cc6600" }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppTopMobileHeader;

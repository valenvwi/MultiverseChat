import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./Login";
import Users from "./Users";
import Signup from "./Signup";
import SetupProfile from "./SetupProfile";
import ProtectedRoute from "../services/ProtectedRoute";
import FinishProfileSetup from "./FinishProfileSetup";
import EditProfile from "./Users/EditProfile";
// import AppBottomNavigation from "./UI/AppBottomNavigation"
import AppTopNavBar from "./UI/AppTopNavBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn: ", isLoggedIn)
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <BrowserRouter>
      { isBigScreen && <AppTopNavBar /> }
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setupProfile" element={<SetupProfile />} />
        <Route path="/finishSetup" element={<FinishProfileSetup />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
      {/* { isLoggedIn && <AppBottomNavigation /> } */}
    </BrowserRouter>
  );
}

export default App;

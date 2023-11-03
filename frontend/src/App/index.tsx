import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./Login";
import Users from "./Users";
import Signup from "./Signup";
import SetupProfile from "./SetupProfile";
import ProtectedRoute from "../services/ProtectedRoute";
import FinishProfileSetup from "./FinishProfileSetup";
import EditProfile from "./Users/EditProfile";
import AppBottomNavigation from "./UI/AppBottomNavigation"
import AppTopNavBar from "./UI/AppTopNavBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline } from "@mui/material";
import { useFetchCurrentUser } from "../Utils/useFetchCurrentUser";
import Chats from "./Chats/index";

function App() {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const currentUser = useFetchCurrentUser();

  return (
    <BrowserRouter>
      <CssBaseline />
      {isBigScreen && <AppTopNavBar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setupProfile" element={<SetupProfile />} />
        <Route path="/finishSetup" element={<FinishProfileSetup />} />
        <Route
          path="/editProfile"
          element={
            currentUser ? (
              <EditProfile currentUser={currentUser} />
            ) : (
              <h5>Loading...</h5>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

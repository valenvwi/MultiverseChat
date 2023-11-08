import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import Users from "./Users";
import Signup from "./Signup";
import SetupProfile from "./SetupProfile";
import ProtectedRoute from "../services/ProtectedRoute";
import FinishProfileSetup from "./FinishProfileSetup";
import AppTopNavBar from "./UI/AppTopNavBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../App.css";
import { useTheme } from "@mui/material";
import { useAuthStore } from "./store/auth";

import Chats from "./Chats/index";
import AppTopMobileHeader from "./UI/AppTopMobileHeader";
import { EditProfileWrapper } from "./Users/EditProfileWrapper";

function App() {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
  <>
    {isBigScreen ? <AppTopNavBar /> : !isLoggedIn && <AppTopMobileHeader />}

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/setupProfile" element={<SetupProfile />} />
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

      <Route path="/finishSetup" element={<FinishProfileSetup />} />
      <Route path="/editProfile" element={<EditProfileWrapper/>} />
    </Routes>
  </>
  )
}

export default App;

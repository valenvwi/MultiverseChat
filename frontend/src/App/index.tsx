import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import Users from "./Users";
import Signup from "./Signup";
import SetupProfile from "./SetupProfile";
import ProtectedRoute from "../services/ProtectedRoute";
import FinishProfileSetup from "./FinishProfileSetup";
import EditProfile from "./Users/EditProfile";
// import AppBottomNavigation from "./UI/AppBottomNavigation";
import AppTopNavBar from "./UI/AppTopNavBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../App.css";
import { useTheme } from "@mui/material";
import { useFetchCurrentUser } from "../Utils/useFetchCurrentUser"
import { useAuthStore } from "./store/auth";

import Chats from "./Chats/index";
import AppTopMobileHeader from "./UI/AppTopMobileHeader";

function App() {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const currentUser = useFetchCurrentUser();
  // console.log("Current user: ", currentUser);

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
      { currentUser &&
      <Route path="/editProfile" element={<EditProfile currentUser={currentUser}/>} />
      }
    </Routes>
  </>
  )
}

export default App;

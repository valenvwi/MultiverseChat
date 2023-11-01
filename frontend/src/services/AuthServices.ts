import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config"
import { UserProfileProps } from "../types/userProfile";
// import AuthServiceProps from "../types/auth";

type AuthProps = {
  login: (username: string, password: string) => any;
  isLoggedIn: boolean;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<any>;
  currentUser: UserProfileProps | null;
};

export function useAuth(): AuthProps {
  const [currentUser, setCurrentUser] = useState<UserProfileProps | null>(null);
  const navigate = useNavigate();

  const getInitialLoggedInValue = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn !== null && loggedIn === "true";
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    getInitialLoggedInValue
  );

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axios.get(
        `${BASEURL}/users/${userId}`,

        {
          withCredentials: true,
        }
      );
      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      const userProfile: UserProfileProps = {
        firstName: userDetails.first_name,
        lastName: userDetails.last_name,
        location: userDetails.location,
        avatar: userDetails.avatar,
        nativeLanguage: userDetails.native_language,
        targetLanguage: userDetails.target_language,
        bio: userDetails.bio
      };
      setCurrentUser(userProfile);
      console.log(userProfile)
    } catch (err: any) {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
      return err;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASEURL}/token/`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      const user_id = response.data.user_id;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_id", user_id);
      setIsLoggedIn(true);
      getUserDetails();
    } catch (err: any) {
      return err.response.status;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASEURL}/register/`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      return response.status;
    } catch (err: any) {
      return err.response.status;
    }
  };

  const logout = async () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");

    try {
      await axios.post(
        `${BASEURL}/logout/`,
        {},
        { withCredentials: true }
      );
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  };

  return {
    login,
    isLoggedIn,
    logout,
    signup,
    currentUser,
  };
}

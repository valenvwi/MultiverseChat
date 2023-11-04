import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";

type AuthProps = {
  userId: string | null;
  login: (username: string, password: string) => any;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<any>;
};

export function useAuth(): AuthProps {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

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
      setUserId(user_id);
      console.log("user_id", user_id);
      localStorage.setItem("user_id", user_id);
      // need to fix this
      return user_id;
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
    navigate("/login");

    try {
      await axios.post(`${BASEURL}/logout/`, {}, { withCredentials: true });
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  };

  return {
    userId,
    login,
    logout,
    signup,
  };
}

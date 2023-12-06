import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import { useAuthStore } from "../App/store/auth";

type AuthProps = {
  login: (username: string, password: string) => any;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<any>;
};

export function useAuth(): AuthProps {
  const navigate = useNavigate();
  const setCurrentUserId = useAuthStore((state) => state.setCurrentUserId);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

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
      setCurrentUserId(user_id);
      setIsLoggedIn(true);
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
    login,
    logout,
    signup,
  };
}

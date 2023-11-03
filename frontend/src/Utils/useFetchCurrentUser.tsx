import { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../config";
import { UserProfileProps } from "../types/userProfile";

export function useFetchCurrentUser(): UserProfileProps | null {
  const [currentUser, setCurrentUser] = useState<UserProfileProps | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await axios.get(`${BASEURL}/users/${userId}/`, {
          withCredentials: true,
        });
        const userDetails = response.data;
        const userProfile: UserProfileProps = {
          firstName: userDetails.first_name,
          lastName: userDetails.last_name,
          location: userDetails.location,
          avatar: userDetails.avatar,
          nativeLanguage: userDetails.native_language,
          targetLanguage: userDetails.target_language,
          bio: userDetails.bio,
          id: userDetails.id,
        };
        setCurrentUser(userProfile);
      } catch (err) {
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  return currentUser;
}

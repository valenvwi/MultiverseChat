import { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../config";
import { UserProfileProps } from "../types/userProfile";
import { useAuthStore } from "../App/store/auth-context";

export function useFetchCurrentUser(): UserProfileProps | null {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  // need to fix the default value not null
  const [currentUser, setCurrentUser] = useState<UserProfileProps | null>(null);
  console.log(currentUserId);

  useEffect(() => {
    // if (!currentUserId) {
    //   return;
    // }
    const fetchCurrentUser = async () => {
      try {
        const userId = currentUserId;
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
  }, [currentUserId]);

  return currentUser;
}

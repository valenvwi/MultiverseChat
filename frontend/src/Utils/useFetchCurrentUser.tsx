import { useState, useEffect } from "react";
import { BASEURL } from "../config";
import { UserProfileProps } from "../types/userProfile";
import { useAuthStore } from "../App/store/auth";
import useAxiosWithJwtInterceptor from "../helpers/jwtinterceptor";

export function useFetchCurrentUser(): UserProfileProps | null {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const [currentUser, setCurrentUser] = useState<UserProfileProps | null>(null);
  const jwtAxios = useAxiosWithJwtInterceptor();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!currentUserId) {
        return;
      }
      try {
        const userId = currentUserId;
        const response = await jwtAxios.get(`${BASEURL}/users/${userId}/`, {
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
        console.error("Error fetching current user:", err);
      }
    };

    fetchCurrentUser();
  }, [currentUserId, jwtAxios]);

  return currentUser;
}

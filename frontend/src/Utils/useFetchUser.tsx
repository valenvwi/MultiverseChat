import { useEffect } from "react";
import { BASEURL } from "../config";
import { UserProfileProps } from "../types/userProfile";
import axios from "axios";
import { useState } from "react";


const useFetchUser = (userId: number) => {
  const [user, setUser] = useState<UserProfileProps>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
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
        setUser(userProfile);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, [userId]);

  return user;
}

export default useFetchUser

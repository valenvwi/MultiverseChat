import { useEffect } from "react";
import { BASEURL } from "../config";
import { UserProfileProps } from "../types/userProfile";
import { useState } from "react";
import useAxiosWithJwtInterceptor from "../helpers/jwtinterceptor";


const useFetchUser = (userId: number) => {
  const jwtAxios = useAxiosWithJwtInterceptor();
  const [user, setUser] = useState<UserProfileProps>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
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

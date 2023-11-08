import { BASEURL } from "../config";
import { UserProfileProps } from "../types/userProfile";
import useAxiosWithJwtInterceptor from "../helpers/jwtinterceptor";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = (userId: number) => {
  const jwtAxios = useAxiosWithJwtInterceptor();

  const queryKey = [`user/${userId}`];
  const queryFn = async () => {
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
    return userProfile;
  };

  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: Boolean(userId),
  });

  return data;
};

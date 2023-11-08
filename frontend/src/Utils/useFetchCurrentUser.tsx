// import { useState, useEffect } from "react";
import { BASEURL } from "../config";
import { UserProfileProps } from "../types/userProfile";
import { useAuthStore } from "../App/store/auth";
import useAxiosWithJwtInterceptor from "../helpers/jwtinterceptor";
import { useQuery } from "@tanstack/react-query";

export function useFetchCurrentUser(): UserProfileProps | null {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const jwtAxios = useAxiosWithJwtInterceptor();

  const queryKey = [`user/${currentUserId}`];
  const queryFn = async () => {
    const response = await jwtAxios.get(`${BASEURL}/users/${currentUserId}/`, {
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
    enabled: Boolean(currentUserId),
  });

  return data || null;
}

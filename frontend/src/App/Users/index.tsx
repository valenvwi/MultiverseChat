import { useState } from "react";
import UserProfile from "./UserProfile";
import { Container, Grid, Typography } from "@mui/material";
import { UserProfileProps, UserProfileData } from "../../types/userProfile";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";
import Navtab from "./Navtab";
import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser";
import { BASEURL } from "../../config";
import AppBottomNavBar from "../UI/AppBottomNavBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppTopMobileNavBar from "../UI/AppTopMobileNavBar";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const jwtAxios = useAxiosWithJwtInterceptor();
  const currentUser = useFetchCurrentUser();
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const apiEndpoint =
    currentTab === 0
      ? `${BASEURL}/users/?native_language=${currentUser?.targetLanguage}&target_language=${currentUser?.nativeLanguage}`
      : `${BASEURL}/users/?target_language=${currentUser?.targetLanguage}`;

  const queryKey = [apiEndpoint];
  const queryFn = async () => {
    const response = await jwtAxios.get(apiEndpoint);
    const data = response.data;

    const userProfiles: UserProfileProps[] = data.map(
      (user: UserProfileData) => ({
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar,
        location: user.location,
        nativeLanguage: user.native_language,
        targetLanguage: user.target_language,
        bio: user.bio,
        id: user.id,
      })
    );
    return userProfiles;
  };

  const { data: users } = useQuery({
    queryKey,
    queryFn,
    initialData: [],
  });

  const handleTabChange = (newTabValue: number) => {
    setCurrentTab(newTabValue);
  };

  return (
    <>
      <Grid sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {!isBigScreen && <AppTopMobileNavBar title="Community" />}
        <Container
          component="main"
          maxWidth="xl"
          sx={{ flexGrow: 1, overflowY: "auto" }}
        >
          <br />
          <Navtab onChangeTab={handleTabChange} />

          {users.length === 0 ? (
            <Typography
              component="h1"
              variant="h4"
              fontWeight={700}
              sx={{ margin: "100px auto", textAlign: "center" }}
            >
              No users found
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} md={6} key={user.id}>
                  <UserProfile user={user} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        {!isBigScreen && <AppBottomNavBar />}
      </Grid>
    </>
  );
};

export default Users;

import { useEffect, useState } from "react";
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

const Users = () => {
  const [users, setUsers] = useState<UserProfileProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const jwtAxios = useAxiosWithJwtInterceptor();
  const currentUser = useFetchCurrentUser();
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const fetchUsers = async (showGoalMatch: boolean) => {
    setIsLoading(true);
    let apiEndpoint = `${BASEURL}/users/`;

    if (showGoalMatch) {
      apiEndpoint += `?native_language=${currentUser?.targetLanguage}&target_language=${currentUser?.nativeLanguage}`;
    } else {
      apiEndpoint += `?target_language=${currentUser?.targetLanguage}`;
    }

    try {
      const response = await jwtAxios.get(apiEndpoint);
      const data = response.data;
      console.log(data);

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

      setUsers(userProfiles.filter((user) => user.id !== currentUser?.id));

      setError(null);
      setIsLoading(false);
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setUsers([]);
        setIsLoading(false);
        throw error;
      }
    }
  };

  const handleTabChange = (newTabValue: number) => {
    setCurrentTab(newTabValue);
  };

  useEffect(() => {
    if (currentUser) {
      fetchUsers(currentTab === 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, currentUser]);

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

          {users.length === 0 && !isLoading ? (
            <Typography
            component="h1" variant="h4" fontWeight={700}
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

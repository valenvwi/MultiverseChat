import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { useAuth } from "../../services/AuthServices";
import { Button, Container, Grid, Typography } from "@mui/material";
import { UserProfileProps, UserProfileData } from "../../types/userProfile";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";
import Navtab from "./Navtab";
import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser";
import { BASEURL } from "../../config";
import AppBottomNavBar from "../UI/AppBottomNavBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Users = () => {
  const { logout } = useAuth();
  const [users, setUsers] = useState<UserProfileProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const jwtAxios = useAxiosWithJwtInterceptor();
  const currentUser = useFetchCurrentUser();
  console.log(currentUser?.targetLanguage);
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const fetchUsers = async () => {
    setIsLoading(true);
    let apiEndpoint = `${BASEURL}/users/`;

    if (currentTab === 0) {
      apiEndpoint += `?target_language=${currentUser?.targetLanguage}`;
    } else {
      apiEndpoint += `?native_language=${currentUser?.targetLanguage}&target_language=${currentUser?.nativeLanguage}`;
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

      console.log("currentUser?.id:", currentUser?.id);

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
    fetchUsers();
  };

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <br />
      <Navtab onChangeTab={handleTabChange} />

      {users.length === 0 && !isLoading && (
        <Typography
          variant="h4"
          sx={{ margin: "0px auto", textAlign: "center" }}
        >
          No users found
        </Typography>
      )}

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} md={6} key={user.id}>
            <UserProfile user={user} />
          </Grid>
        ))}
      </Grid>
      {!isBigScreen && <AppBottomNavBar />}
    </Container>
  );
};

export default Users;

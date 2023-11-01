import { useEffect, useState } from "react";
// import Axios from "axios";
import UserProfile from "./UserProfile";
import { useAuth } from "../../services/AuthServices";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { UserProfileProps, UserProfileData } from "../../types/userProfile";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Navtab from "./Navtab";
import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser"
import { BASEURL } from "../../config";

const Users = () => {
  const { logout } = useAuth();
  const [users, setUsers] = useState<UserProfileProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const jwtAxios = useAxiosWithJwtInterceptor();
  const currentUser = useFetchCurrentUser();
  console.log(currentUser?.targetLanguage);
  const [currentTab, setCurrentTab] = useState(0);

  const fetchUsers = async () => {
    setIsLoading(true);
    let apiEndpoint = `${BASEURL}/users/`;

    if (currentTab === 0) {
      apiEndpoint += `?native_language=${currentUser?.targetLanguage}&target_language=${currentUser?.nativeLanguage}`;
    } else {
      apiEndpoint += `?target_language=${currentUser?.targetLanguage}`;
    }

    try {
      // const response = await jwtAxios.get(`http://localhost:8000/api/users/?target_language=${currentUser?.targetLanguage}`);
      const response = await jwtAxios.get(apiEndpoint);
      const data = response.data;
      console.log(data);

      const userProfiles: UserProfileProps[] = data.map((user: UserProfileData) => ({
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar,
        location: user.location,
        nativeLanguage: user.native_language,
        targetLanguage: user.target_language,
        bio: user.bio,
        id: user.id,
      }));

      setUsers(userProfiles);

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
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg">
      <h1>All users</h1>
      <Button onClick={logout}>Logout</Button>
      <Navtab onChangeTab={handleTabChange}/>

      { users.length === 0 && !isLoading && (
        <Typography variant="h4" sx={{ margin: "0 auto"}}>No users found</Typography>
      ) }

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} md={6} key={user.id}>
            <UserProfile user={user} />
          </Grid>
        ))}
      </Grid>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Messages" icon={<ChatIcon />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default Users;

import { useEffect, useState } from "react";
// import Axios from "axios";
import UserProfile from "./UserProfile";
import { useAuth } from "../../services/AuthServices";
import { Button, Container, Grid } from "@mui/material";
import UserProfileProps from "../../types/userProfile";
import useAxiosWithJwtInterceptor from "../../helpers/jwtinterceptor";

const Users = () => {
  const { logout } = useAuth();
  const [users, setUsers] = useState<UserProfileProps>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const jwtAxios = useAxiosWithJwtInterceptor();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // await new Promise(resolve => setTimeout(resolve, 5000));
      const response = await jwtAxios.get(`http://localhost:8000/api/users`);
      const data = response.data;
      console.log(data);

      const userProfiles = data.map((user) => ({
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar,
        location: user.location,
        nativeLanguage: user.native_language,
        targetLanguage: user.target_language,
        bio: user.bio,
        id: user.id, // Include the user ID if needed
      }));

      setUsers(userProfiles);

      setError(null);
      setIsLoading(false);
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(new Error("400"));
        setIsLoading(false);
        throw error;
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg">
      <h1>All users</h1>
      <Button onClick={logout}>Logout</Button>

      <Grid container spacing={2}>
        {users.map((user: any) => (
          <Grid item xs={12} md={6} key={user.id}>
            <UserProfile user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Users;

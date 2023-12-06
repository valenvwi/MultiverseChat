import { Typography } from "@mui/material";
import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser";
import EditProfile from "./EditProfile";

export const EditProfileWrapper = () => {
  const currentUser = useFetchCurrentUser();

  if (!currentUser) { return <Typography>Loading...</Typography>;}
  return <EditProfile currentUser={currentUser} />;
};

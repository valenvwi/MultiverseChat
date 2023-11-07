import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser";
import EditProfile from "./EditProfile";

export const EditProfileWrapper = () => {
  const currentUser = useFetchCurrentUser();
  console.log(currentUser);

  return <EditProfile currentUser={currentUser} />;
};

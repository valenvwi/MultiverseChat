import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import defaultAvatar from "./assets/default.png";
import { UserProfileProps } from "../types/userProfile";
import { BASEURL } from "../config";
import languageOptions from "../constants";
import AppTopMobileHeader from "./UI/AppTopMobileHeader";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

axios.defaults.withCredentials = true;

const SetupProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();

  const changeAvatar = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setAvatarPreview((e.target?.result as string) || defaultAvatar);
    };

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
      formik.setFieldValue("avatar", e.target?.files[0]);
    }
  };

  const createProfile = async (userProfile: UserProfileProps) => {
    const formData = new FormData();

    formData.append("first_name", userProfile.firstName);
    formData.append("last_name", userProfile.lastName);
    if (userProfile.avatar) {
      formData.append("avatar", userProfile.avatar);
    }
    formData.append("location", userProfile.location);
    formData.append("native_language", userProfile.nativeLanguage);
    formData.append("target_language", userProfile.targetLanguage);
    formData.append("bio", userProfile.bio);

    console.log("FormData: ", formData);

    try {
      const response = await axios.post<UserProfileProps>(
        `${BASEURL}/users/`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.status;
    } catch (err: any) {
      return err.response.status;
    }
  };

  const formik = useFormik<UserProfileProps>({
    initialValues: {
      firstName: "",
      lastName: "",
      location: "",
      avatar: null,
      nativeLanguage: "",
      targetLanguage: "",
      bio: "",
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      // if (!values.avatar.name) {
      //   errors.avatar = 'Please upload an avatar.';
      // }
      if (values.firstName.trim() === "") {
        errors.firstName = "Required";
      }
      if (values.lastName.trim() === "") {
        errors.lastName = "Required";
      }
      if (values.location.trim() === "") {
        errors.location = "Required";
      }
      if (!values.nativeLanguage) {
        errors.nativeLanguage = "Required";
      }
      if (!values.targetLanguage) {
        errors.targetLanguage = "Required";
      }
      if (values.bio.length < 10 || values.bio.length > 200) {
        errors.bio = "Minimum 10 Characters & maximum 200 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const {
        firstName,
        lastName,
        location,
        avatar,
        nativeLanguage,
        targetLanguage,
        bio,
      } = values;

      const status = await createProfile({
        firstName,
        lastName,
        avatar,
        location,
        nativeLanguage,
        targetLanguage,
        bio,
      });
      if (status === 409) {
        formik.setErrors({
          targetLanguage: "Invalid targetLanguage",
        });
      } else if (status === 401) {
        console.log("Unauthorized");
        formik.setErrors({
          targetLanguage: "targetLanguage already existed",
          nativeLanguage: "Invalid targetLanguage or nativeLanguage",
        });
      } else {
        localStorage.setItem("first_name", firstName);
        navigate("/finishSetup");
      }
    },
  });
  return (
    <>
      {!isBigScreen && <AppTopMobileHeader />}
      <Container
        component="main"
        maxWidth="md"
        sx={{ display: { md: "flex" }, flexGrow: { md: 1 } }}
      >
        <Box
          sx={{
            margin: { xs: "36px auto", md: "auto" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            fontWeight={700}
            sx={{ textAlign: "center" }}
          >
            One more step and you are ready to go!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            sx={{ mt: 4 }}
          >
            <Grid container spacing={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                sx={{ margin: "auto", mb: 2 }}
              >
                <Avatar
                  src={avatarPreview}
                  sx={{ width: 128, height: 128, my: 2 }}
                  alt="avatar"
                />

                <Button variant="contained" component="label">
                  Choose Avatar
                  <input
                    name="avatar"
                    accept="image/*"
                    id="image"
                    type="file"
                    hidden
                    onChange={(e) => {
                      changeAvatar(e);
                    }}
                  />
                </Button>
              </Box>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formik.values.firstName}
                  id="firstName"
                  label="First Name"
                  onChange={formik.handleChange}
                  error={
                    !!formik.touched.firstName && !!formik.errors.firstName
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formik.values.lastName}
                  id="lastName"
                  label="Last Name"
                  onChange={formik.handleChange}
                  error={!!formik.touched.lastName && !!formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formik.values.location}
                  id="location"
                  label="Location"
                  onChange={formik.handleChange}
                  error={!!formik.touched.location && !!formik.errors.location}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Native Language
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    id="nativeLanguage"
                    name="nativeLanguage"
                    label="Native Language"
                    value={formik.values.nativeLanguage}
                    onChange={formik.handleChange}
                    error={
                      !!formik.touched.nativeLanguage &&
                      !!formik.errors.nativeLanguage
                    }
                    MenuProps={{ sx: { maxHeight: "50vh" } }}
                  >
                    {languageOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Target Language
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    id="targetLanguage"
                    name="targetLanguage"
                    label="Target Language"
                    value={formik.values.targetLanguage}
                    onChange={formik.handleChange}
                    error={
                      !!formik.touched.targetLanguage &&
                      !!formik.errors.targetLanguage
                    }
                    MenuProps={{ sx: { maxHeight: "50vh" } }}
                  >
                    {languageOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  required
                  fullWidth
                  multiline
                  id="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={!!formik.touched.bio && !!formik.errors.bio}
                  helperText={formik.touched.bio && formik.errors.bio}
                  autoComplete="bio"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SetupProfile;

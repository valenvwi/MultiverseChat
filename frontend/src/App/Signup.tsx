import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthServices";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Grid, Typography, Container, Link, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const Register = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (values.username.length < 4 || values.username.length > 15) {
        errors.username = "Username must be 4-15 characters long";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      if (values.password.length < 6 || values.password.length > 20) {
        errors.password = "Password must be 6-20 characters long";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { username, email, password } = values;

      const status = await signup(username, email, password);
      if (status === 409) {
        formik.setErrors({
          username: "Username already existed",
        });
      } else if (status === 400) {
        console.log("Unauthorized");
        formik.setErrors({
          email: "Email already existed",
        });
      } else {
        const loginstatus = await login(username, password);
        if (loginstatus === 401) {
          console.log("Unauthorized");
          formik.setErrors({
            username: "Invalid username or password",
            password: "Invalid username or password",
          });
        } else {
          navigate("/setupprofile");
        }
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="username"
                  id="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={!!formik.touched.username && !!formik.errors.username}
                  helperText={formik.touched.username && formik.errors.username}
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={!!formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={!!formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Re-enter password"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 3 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  );
};

export default Register;

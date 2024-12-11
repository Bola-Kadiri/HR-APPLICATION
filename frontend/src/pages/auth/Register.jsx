import { useState } from "react";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import {  useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons

import './Register.css'
import AuthHeaderRegister from "../../component/Layout/auth-layout/AuthHeaderRegister";
import AuthShape from "../../component/auth-shape/AuthShape";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form fields state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");

  // Error handling state
  const [errorMessage, setErrorMessage] = useState("");

  // Register mutation hook
  const [register, { isLoading, error }] = useRegisterUserMutation();

  // Toggle visibility for passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== re_password) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    setErrorMessage(""); // Clear any previous error

    try {
      // Send registration request
      const response = await register({
        username,
        email,
        password,
        re_password: re_password,
      }).unwrap();

      if (response) {
        // On successful registration, store JWT token and user data
        localStorage.setItem("token", response.token);
        dispatch(setCredentials(response));

        // Clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setRe_password("");

        // Redirect to login page
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorMessage(
        err?.data?.message || "An error occurred during registration."
      );
    }
  };

  return (
    <div>
      <AuthHeaderRegister/>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        bgcolor="#fff"
        gap={3}
      >
        <div
          style={{ padding: 16, maxWidth: 500, width: "100%", borderRadius: 8 }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                value={re_password}
                onChange={(e) => setRe_password(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              {error && !errorMessage && (
                <Alert severity="error">
                  Registration failed: {error.message}
                </Alert>
              )}
              <Button
                variant="contained"
               style={{backgroundColor: "#76c04e"}}
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
            </Stack>
          </form>

          <Box marginTop={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
             <AuthShape/>
            </Typography>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Register;

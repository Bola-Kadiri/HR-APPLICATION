import { useState } from "react";
import { useLoginUserMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthHeaderLogin from "../../component/Layout/authHeaderLogin";
import AuthShape from "../../component/auth-shape/AuthShape";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      dispatch(
        setCredentials({ access: response.access, refresh: response.refresh })
      );
      setErrorMessage("");

      // Navigate to the appropriate dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error?.data?.detail || "An error occurred during login.");
    }
  };

  return (
    <div>
      <AuthHeaderLogin />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        bgcolor="#fff"
        gap="100px"
      >
        <div
          style={{
            padding: 3,
            maxWidth: "500px",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            Login to Your Account
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack spacing={2} style={{ width: "100%" }}>
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
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
                  "Login"
                )}
              </Button>
            </Stack>
          </form>
          <Box
            marginTop={2}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0px 35px",
            }}
          >
            <Typography variant="body2" style={{paddingBottom: "20px"}}>
              <Link
                to="/reset-password"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </Typography>
          </Box>
          <div style={{ marginBottom: "20px" }}>
            <AuthShape />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Login;

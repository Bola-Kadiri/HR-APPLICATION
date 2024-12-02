import { useState } from 'react';
import { useRegisterMutation } from '../../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import register_image from '../../assets/register.png';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';  // Import icons

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [register, { isLoading, error }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State to toggle confirm password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    setErrorMessage('');
    try {
      const response = await register({
        username,
        email,
        password,
        confirm_password: confirmPassword,
      }).unwrap();

      if (response) {
        dispatch(setUser(response));
        console.log(response);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage(err?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#fff"
      gap={"100px"}
    >
      <div
        style={{
          padding: 3,
          maxWidth: '500px',
          width: '100%',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={2} style={{ width: '100%' }}>
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
              type={showPassword ? 'text' : 'password'}  // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}  // Toggle visibility
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}  {/* Toggle Icon */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}  // Toggle confirm password visibility
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}  // Toggle visibility
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}  {/* Toggle Icon */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {error && !errorMessage && (
              <Alert severity="error">Registration failed: {error.message}</Alert>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
          </Stack>
        </form>
        <Box marginTop={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </div>
      <img src={register_image} alt="hr-image" style={{ width: "700px", height: "500px" }} />
    </Box>
  );
};

export default Register;









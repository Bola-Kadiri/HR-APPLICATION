import { useState } from 'react';
import { useLoginMutation } from '../../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import hr_image from '../../assets/Rectangle 575.png';
import { useNavigate } from 'react-router-dom';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      console.log(response); // Log the response to verify the data
      
      localStorage.setItem('token', response.access_token); // Store JWT token
      
      // Dispatch user info to Redux store
      dispatch(setUser(response.user));
  
      // Ensure correct redirection logic based on user role
      if (response.user?.role === 'admin') {
        console.log('Redirecting to admin dashboard...');
        navigate('/dashboard'); // Admin dashboard
      } else {
        console.log('Redirecting to user dashboard...');
        navigate('/login'); // User dashboard or home page
      }
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMessage(err?.data?.detail || 'An error occurred during login.');
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
          Login to Your Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={2} style={{ width: '100%' }}>
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
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}  {/* Toggle Icon */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {error && !errorMessage && (
              <Alert severity="error">Login failed: {error.message}</Alert>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </Stack>
        </form>
        <Box marginTop={2} textAlign="center">
          <Typography variant="body2">
            Don&apos;t have an account?{' '}
            <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Register here
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/forgot-password" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Typography>
        </Box>
      </div>
      <img src={hr_image} alt="hr-image" style={{ width: "500px", height: "500px" }} />
    </Box>
  );
};

export default Login;


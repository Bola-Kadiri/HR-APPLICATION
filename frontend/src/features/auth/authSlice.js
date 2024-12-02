import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: localStorage.getItem('access_token') || null, // Access token from localStorage
  refreshToken: localStorage.getItem('refresh_token') || null, // Refresh token from localStorage
  isAuthenticated: !!localStorage.getItem('access_token'), // Boolean flag based on access token
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('access_token'); // Remove access token
      localStorage.removeItem('refresh_token'); // Remove refresh token
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('access_token', action.payload); // Persist new access token
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle successful login
      .addMatcher(
        (action) => action.type === 'authApi/login/fulfilled',
        (state, action) => {
          const { access_token, refresh_token, user } = action.payload;
          state.accessToken = access_token;
          state.refreshToken = refresh_token;
          state.user = user;
          state.isAuthenticated = true;
          state.isLoading = false;
          localStorage.setItem('access_token', access_token); // Persist access token
          localStorage.setItem('refresh_token', refresh_token); // Persist refresh token
        }
      )
      // Handle failed login
      .addMatcher(
        (action) => action.type === 'authApi/login/rejected',
        (state) => {
          state.isLoading = false;
          state.error = 'Login failed';
        }
      );
  },
});

export const { setUser, logout, updateAccessToken, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;

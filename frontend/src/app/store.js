import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { jobApi } from '../features/job/jobApiSlice'; // Adjust the path
import { applicationApi } from '../features/application/applicationApiSlice'; // Adjust the path
import authReducer from '../features/auth/authSlice'; // Import the authSlice reducer

// Configure the main Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Auth slice reducer
    [authApi.reducerPath]: authApi.reducer, // Auth API state
    [jobApi.reducerPath]: jobApi.reducer, // Job API state
    [applicationApi.reducerPath]: applicationApi.reducer, // Application API state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware) // Add middleware for authApi
      .concat(jobApi.middleware) // Add middleware for jobApi
      .concat(applicationApi.middleware), // Add middleware for applicationApi
});

export default store;




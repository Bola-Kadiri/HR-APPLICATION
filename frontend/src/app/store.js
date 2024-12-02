import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { jobApi } from '../features/job/jobApiSlice'; // Adjust the path
import { applicationApi } from '../features/application/applicationApiSlice'; // Adjust the path
import authReducer from '../features/auth/authSlice'; // Import the authSlice reducer
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage

// Configure Redux Persist for authentication
const authPersistConfig = {
  key: 'auth', // Key for the auth slice
  storage,
};

// Persist the authSlice reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Configure the main Redux store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth slice
    [authApi.reducerPath]: authApi.reducer, // Auth API state
    [jobApi.reducerPath]: jobApi.reducer, // Job API state
    [applicationApi.reducerPath]: applicationApi.reducer, // Application API state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Disable serializable check for specific actions, like persisting actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(authApi.middleware) // Add middleware for authApi
      .concat(jobApi.middleware) // Add middleware for jobApi
      .concat(applicationApi.middleware), // Add middleware for applicationApi
});

// Create the persistor
export const persistor = persistStore(store);

export default store;




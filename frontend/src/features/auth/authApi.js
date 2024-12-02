import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateAccessToken, logout } from './authSlice';

// Base query to be used by Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/', // Django backend URL
  prepareHeaders: (headers) => {
    // Retrieve the token from localStorage or from the Redux state if needed
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Enhanced base query to handle token refresh logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = api.getState()?.auth?.refreshToken; // Access Redux state

    if (refreshToken) {
      const refreshResponse = await baseQuery(
        {
          url: 'auth/refresh/',  // Adjust this URL based on your refresh endpoint
          method: 'POST',
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResponse?.data) {
        // Store the new access token in localStorage and Redux state
        localStorage.setItem('token', refreshResponse.data.access);
        api.dispatch(updateAccessToken(refreshResponse.data.access));
        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout()); // Logout user if refresh fails
      }
    } else {
      api.dispatch(logout()); // Logout user if no refresh token is available
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register/',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyEmail: builder.query({
      query: ({ uid, token }) => `auth/verify-email/${uid}/${token}/`,
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'auth/forgot-password/',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/reset-password/',
        method: 'POST',
        body: data,
      }),
    }),
    fetchProfile: builder.query({
      query: () => 'auth/profile/',
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useFetchProfileQuery,
} = authApi;

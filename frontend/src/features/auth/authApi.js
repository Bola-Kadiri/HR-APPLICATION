import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Fetch tokens from local storage
const getToken = () => localStorage.getItem('accessToken');

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/auth/',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'users/',
        method: 'POST',
        body: userData,
      }),
    }),
    activateUser: builder.mutation({
      query: (activationData) => ({
        url: 'users/activation/',
        method: 'POST',
        body: activationData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'jwt/create/',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshTokenData) => ({
        url: 'jwt/refresh/',
        method: 'POST',
        body: refreshTokenData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (emailData) => ({
        url: 'users/reset_password/',
        method: 'POST',
        body: emailData,
      }),
    }),
    resetPasswordConfirmation: builder.mutation({
      query: (resetData) => ({
        url: 'users/reset_password_confirm/',
        method: 'POST',
        body: resetData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useActivateUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmationMutation,
} = authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }), // Adjust base URL to your backend's API root
  tagTypes: ['Job'], // Tag jobs for automatic cache invalidation
  endpoints: (builder) => ({
    // Fetch all jobs
    fetchJobs: builder.query({
      query: () => 'job/',
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Job', id })) : ['Job'],
    }),

    // Fetch job details
    fetchJobDetails: builder.query({
      query: (id) => `/job/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),

    // Fetch monthly posts for a job
    fetchMonthlyPosts: builder.query({
      query: (id) => `/job/${id}/monthly_post_data/`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),

    // Fetch yearly posts for a job
    fetchYearlyPosts: builder.query({
      query: (id) => `/job/${id}/yearly_post_data/`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),

    // Fetch posting details for a job
    fetchPostingDetails: builder.query({
      query: (id) => `/job/${id}/posting_details/`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),

    // Create a new job
    createJob: builder.mutation({
      query: (newJob) => ({
        url: 'job/',
        method: 'POST',
        body: newJob,
      }),
      invalidatesTags: ['Job'], // Invalidate job list after creation
    }),

    // Update an existing job
    updateJob: builder.mutation({
      query: ({ id, ...updatedJob }) => ({
        url: `/job/${id}/`,
        method: 'PUT',
        body: updatedJob,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Job', id }],
    }),

    // Partially update an existing job (PATCH)
    patchJob: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `/job/${id}/`,
        method: 'PATCH',
        body: updatedFields,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Job', id }],
    }),

    // Delete a job
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/job/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Job', id }],
    }),
  }),
});

export const {
  useFetchJobsQuery,
  useFetchJobDetailsQuery,
  useFetchMonthlyPostsQuery,
  useFetchYearlyPostsQuery,
  useFetchPostingDetailsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  usePatchJobMutation,
  useDeleteJobMutation,
} = jobApi;


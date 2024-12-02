import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8000/'; // Change to your Django API URL

export const applicationApi = createApi({
    reducerPath: 'applicationApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        fetchApplications: builder.query({
            query: () => 'applications/applications/', // Adjusted endpoint
        }),
        fetchApplicationDetails: builder.query({
            query: (id) => `applications/${id}/`, // Adjusted endpoint
        }),
        createApplication: builder.mutation({
            query: (newApplication) => ({
                url: 'applications/', // Adjusted endpoint
                method: 'POST',
                body: newApplication, // New application data to be created
            }),
        }),
        updateApplication: builder.mutation({
            query: ({ id, ...updatedApplication }) => ({
                url: `applications/${id}/`, // Adjusted endpoint
                method: 'PUT',
                body: updatedApplication, // Updated application data
            }),
        }),
        deleteApplication: builder.mutation({
            query: (id) => ({
                url: `/${id}/`, // Adjusted endpoint
                method: 'DELETE', // Delete request for a specific application
            }),
        }),
        applyToJob: builder.mutation({
            query: ({ jobId, applicationData }) => ({
                url: `applications/applications/${jobId}/apply/`, // Dynamic URL with jobId
                method: 'POST',
                body: applicationData, // Application data being submitted
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useFetchApplicationsQuery,
    useFetchApplicationDetailsQuery,
    useCreateApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
    useApplyToJobMutation, // Export the generated hook for the applyToJob mutation
} = applicationApi;

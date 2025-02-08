import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from '@/env';
import { 
  Submission,
  CreateSubmissionRequest,
  UpdateSubmissionRequest,
  GetSubmissionsParams,
  GetSubmissionsResponse
} from '@/types/submission';

export const submissionApi = createApi({
  reducerPath: 'submissionApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${env.NEXT_PUBLIC_API_ENDPOINT}/submissions`,
    credentials: 'include'
  }),
  tagTypes: ['Submission'],
  endpoints: (builder) => ({
    // Get all submissions (admin)
    getAdminSubmissions: builder.query<GetSubmissionsResponse, GetSubmissionsParams>({
      query: (params) => ({
        url: '/admin',
        method: 'GET',
        params,
      }),
      providesTags: ['Submission'],
    }),

    // Get user's submissions
    getUserSubmissions: builder.query<GetSubmissionsResponse, GetSubmissionsParams>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
      providesTags: ['Submission'],
    }),

    // Get specific submission
    getSubmission: builder.query<Submission, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Submission', id }],
    }),

    // Create submission
    createSubmission: builder.mutation<Submission, CreateSubmissionRequest>({
      query: (submission) => ({
        url: '/',
        method: 'POST',
        body: submission,
      }),
      invalidatesTags: ['Submission'],
    }),

    // Update submission (admin)
    updateSubmission: builder.mutation<Submission, UpdateSubmissionRequest>({
      query: ({ id, ...submission }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: submission,
      }),
      invalidatesTags: ['Submission'],
    }),

    // Delete submission
    deleteSubmission: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Submission'],
    }),
  }),
});

export const {
  useGetAdminSubmissionsQuery,
  useGetUserSubmissionsQuery,
  useGetSubmissionQuery,
  useCreateSubmissionMutation,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
  util: { getRunningQueriesThunk }
} = submissionApi;

// Export the prefetch method
export const { getSubmission: getPrefetchSubmission } = submissionApi.endpoints; 
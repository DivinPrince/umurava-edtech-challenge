import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from '@/env';
import { 
  Challenge, 
  CreateChallengeRequest, 
  UpdateChallengeRequest, 
  GetChallengesParams, 
  GetChallengesResponse, 
  GetChallengeParticipantsResponse,
  GetChallengeParticipantsParams,
  GetChallengeSubmissionsResponse,
  GetChallengeSubmissionsParams
} from '@/types/challenge';
import { Submission } from '@/types/submission';

export const challengeApi = createApi({
  reducerPath: 'challengeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${env.NEXT_PUBLIC_API_ENDPOINT}/challenges`,
    credentials: 'include'
  }),
  tagTypes: ['Challenge', 'Submission'],
  endpoints: (builder) => ({
    getChallenges: builder.query<GetChallengesResponse, GetChallengesParams>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // Create a cache key based on everything except page
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { page, ...rest } = queryArgs;
        return `${endpointName}-${JSON.stringify(rest)}`;
      },
      merge: (currentCache, newItems, { arg: { page = 1 } }) => {
        // Only merge for pages > 1, otherwise return new items
        if (page === 1) {
          return newItems;
        }
        return {
          ...newItems,
          data: [...currentCache.data, ...newItems.data],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        // Only refetch if the arguments have changed
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
      providesTags: ['Challenge'],
    }),
    createChallenge: builder.mutation<Challenge, CreateChallengeRequest>({
      query: (challenge) => ({
        url: '/',
        method: 'POST',
        body: challenge,
      }),
      invalidatesTags: ['Challenge'],
    }),
    getChallenge: builder.query<Challenge, { id: string, type: string }>({
      query: ({ id, type = 'id' }) => ({
        url: `/${type}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, { id }) => [{ type: 'Challenge', id }],
    }),
    updateChallenge: builder.mutation<Challenge, UpdateChallengeRequest>({
      query: ({ id, ...challenge }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: challenge,
      }),
      invalidatesTags: ['Challenge'],
    }),
    deleteChallenge: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Challenge'],
    }),
    getParticipants: builder.query<GetChallengeParticipantsResponse, { id: string, params: GetChallengeParticipantsParams }>({
      query: ({ id, params }) => ({
        url: `/${id}/participants`,
        method: 'GET',
        params,
      }),
      providesTags: (result, error, { id }) => [{ type: 'Challenge', id }],
    }),
    getChallengeSubmissions: builder.query<GetChallengeSubmissionsResponse, { id: string, params: GetChallengeSubmissionsParams }>({
      query: ({ id, params }) => ({
        url: `/${id}/submissions`,
        method: 'GET',
        params,
      }),
      providesTags: (result, error, { id }) => [{ type: 'Challenge', id }],
    }),
    getUserSubmission: builder.query<Submission, { id: string, userId: string }>({
      query: ({ id, userId }) => ({
        url: `/${id}/submissions/${userId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { id }) => [{ type: 'Submission', id }],
    })
  }),
});

export const {
  useGetChallengesQuery,
  useGetChallengeQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
  useGetParticipantsQuery,
  useGetUserSubmissionQuery,
  util: { getRunningQueriesThunk }  
} = challengeApi;

// Export the prefetch method
export const { getChallenge: getPrefetchChallenge } = challengeApi.endpoints;
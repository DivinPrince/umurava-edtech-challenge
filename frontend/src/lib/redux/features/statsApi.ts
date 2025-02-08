import env from '@/env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface DateRange {
  startDate: string;
  endDate: string;
}

interface StatTrend {
  count: number;
  percentage: number;
  direction: 'up' | 'down';
}

interface UserStats {
  openChallenges: number;
  ongoingChallenges: number;
  completedChallenges: number;
}

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${env.NEXT_PUBLIC_API_ENDPOINT}/stats`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getUserStats: builder.query<UserStats, void>({
      query: () => '/user',
    }),
    getTotalChallengesStats: builder.query<StatTrend, DateRange>({
      query: ({ startDate, endDate }) => ({
        url: '/challenges/total',
        params: { startDate, endDate },
      }),
    }),
    getParticipantsStats: builder.query<StatTrend, DateRange>({
      query: ({ startDate, endDate }) => ({
        url: '/challenges/participants',
        params: { startDate, endDate },
      }),
    }),
    getOpenChallengesStats: builder.query<StatTrend, DateRange>({
      query: ({ startDate, endDate }) => ({
        url: '/challenges/open',
        params: { startDate, endDate },
      }),
    }),
    getOngoingChallengesStats: builder.query<StatTrend, DateRange>({
      query: ({ startDate, endDate }) => ({
        url: '/challenges/ongoing',
        params: { startDate, endDate },
      }),
    }),
    getCompletedChallengesStats: builder.query<StatTrend, DateRange>({
      query: ({ startDate, endDate }) => ({
        url: '/challenges/completed',
        params: { startDate, endDate },
      }),
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetTotalChallengesStatsQuery,
  useGetParticipantsStatsQuery,
  useGetOpenChallengesStatsQuery,
  useGetOngoingChallengesStatsQuery,
  useGetCompletedChallengesStatsQuery,
} = statsApi; 
import { z } from 'zod';

const dateStringSchema = z.string().transform(val => new Date(val));

export const getStatsSchema = z.object({
    startDate: dateStringSchema,
    endDate: dateStringSchema
});

export type GetStatsInput = z.infer<typeof getStatsSchema>;

export interface UserStats {
    openChallenges: number;
    ongoingChallenges: number;
    completedChallenges: number;
}

export interface StatWithTrend {
    count: number;
    percentage: number;
    direction: 'up' | 'down';
}
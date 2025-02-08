import { Request, Response } from 'express';
import { StatsService } from './stats.service';
import { GetStatsInput } from './stats.schema';
import { HTTPSTATUS } from '@/config/http.config';
import { asyncHandler } from '@/middlewares/async-handler';

export class StatsController {
    constructor(
        private readonly statsService: StatsService
    ) { }

    public getUserStats = asyncHandler(async (req: Request, res: Response) => {
        const stats = await this.statsService.getUserStats();
        return res.status(HTTPSTATUS.OK).json(stats);
    });

    public getTotalChallengesStats = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        const stats = await this.statsService.getTotalChallengesStats(
            new Date(startDate as string),
            new Date(endDate as string)
        );
        return res.status(HTTPSTATUS.OK).json(stats);
    });

    public getParticipantsStats = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        const stats = await this.statsService.getParticipantsStats(
            new Date(startDate as string),
            new Date(endDate as string)
        );
        return res.status(HTTPSTATUS.OK).json(stats);
    });

    public getOpenChallengesStats = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        const stats = await this.statsService.getOpenChallengesStats(
            new Date(startDate as string),
            new Date(endDate as string)
        );
        return res.status(HTTPSTATUS.OK).json(stats);
    });

    public getOngoingChallengesStats = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        const stats = await this.statsService.getOngoingChallengesStats(
            new Date(startDate as string),
            new Date(endDate as string)
        );
        return res.status(HTTPSTATUS.OK).json(stats);
    });

    public getCompletedChallengesStats = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        const stats = await this.statsService.getCompletedChallengesStats(
            new Date(startDate as string),
            new Date(endDate as string)
        );
        return res.status(HTTPSTATUS.OK).json(stats);
    });
}
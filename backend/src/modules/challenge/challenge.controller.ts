import { asyncHandler } from "@/middlewares/async-handler";
import { ChallengeService } from "./challenge.service";
import { HTTPSTATUS } from "@/config/http.config";
import { Request } from "express";
import { AppError } from "@/lib/utils/app-error";
import { AuthService } from "../auth/auth.service";

export class ChallengeController {
    constructor(
        private readonly challengeService: ChallengeService,
        private readonly authService: AuthService
    ) {}

    public getChallenges = asyncHandler(async (req: Request, res) => {
        const {
            page,
            limit,
            title,
            minPrize,
            maxPrize,
            deadline,
            sortBy,
            sortOrder,
            search,
            filter
        } = req.query;

        const challenges = await this.challengeService.getChallenges({
            page: page ? parseInt(page as string) : undefined,
            limit: limit ? parseInt(limit as string) : undefined,
            title: title as string,
            search: search as string,
            minPrize: minPrize ? parseInt(minPrize as string) : undefined,
            maxPrize: maxPrize ? parseInt(maxPrize as string) : undefined,
            deadline: deadline ? new Date(deadline as string) : undefined,
            sortBy: sortBy as 'createdAt' | 'deadline' | 'prize',
            sortOrder: sortOrder as 'asc' | 'desc',
            filter: filter as 'completed' | 'ongoing' | 'open'
        });

        return res.status(HTTPSTATUS.OK).json(challenges);
    });

    public createChallenge = asyncHandler(async (req: Request, res) => {
        const challenge = await this.challengeService.createChallenge(req.cleanBody);
        return res.status(HTTPSTATUS.CREATED).json(challenge);
    });

    public updateChallenge = asyncHandler(async (req: Request, res) => {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Challenge ID is required", HTTPSTATUS.BAD_REQUEST);
        }

        const challenge = await this.challengeService.updateChallenge(id, req.cleanBody);
        return res.status(HTTPSTATUS.OK).json(challenge);
    });

    public getChallenge = asyncHandler(async (req: Request, res) => {
        const { type, identifier } = req.params;
        
        if (!identifier) {
            throw new AppError("Challenge identifier is required", HTTPSTATUS.BAD_REQUEST);
        }

        if (type !== 'id' && type !== 'slug') {
            throw new AppError("Invalid identifier type. Must be either 'id' or 'slug'", HTTPSTATUS.BAD_REQUEST);
        }

        const challenge = await this.challengeService.getChallenge(identifier, type);
        return res.status(HTTPSTATUS.OK).json(challenge);
    });

    public deleteChallenge = asyncHandler(async (req: Request, res) => {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Challenge ID is required", HTTPSTATUS.BAD_REQUEST);
        }

        const result = await this.challengeService.deleteChallenge(id);
        return res.status(HTTPSTATUS.OK).json(result);
    });

    public getParticipants = asyncHandler(async (req: Request, res) => {
        const { id } = req.params;
        const { page, limit } = req.query;

        if (!id) {
            throw new AppError("Challenge ID is required", HTTPSTATUS.BAD_REQUEST);
        }

        const participants = await this.challengeService.getParticipants(id, {
            page: page ? parseInt(page as string) : undefined,
            limit: limit ? parseInt(limit as string) : undefined
        });

        return res.status(HTTPSTATUS.OK).json(participants);
    });

    public getSubmissions = asyncHandler(async (req: Request, res) => {
        const { id } = req.params;
        const { page, limit, sortBy, sortOrder } = req.query;
        
        if (!id) {
            throw new AppError("Challenge ID is required", HTTPSTATUS.BAD_REQUEST);
        }

        const submissions = await this.challengeService.getSubmissions(id, {
            page: page ? parseInt(page as string) : undefined,
            limit: limit ? parseInt(limit as string) : undefined,
            sortBy: sortBy as string,
            sortOrder: sortOrder as string
        });

        return res.status(HTTPSTATUS.OK).json(submissions);
    });

    public getUserSubmission = asyncHandler(async (req: Request, res) => {
        const { id, userId } = req.params;

        if (!id || !userId) {
            throw new AppError("Challenge ID and User ID are required", HTTPSTATUS.BAD_REQUEST);
        }

        const submission = await this.challengeService.getUserSubmission(id, userId);
        return res.status(HTTPSTATUS.OK).json(submission);
    });
}
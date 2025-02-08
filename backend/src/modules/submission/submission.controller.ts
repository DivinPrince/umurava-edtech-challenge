import { asyncHandler } from "@/middlewares/async-handler";
import { SubmissionService } from "./submission.service";
import { HTTPSTATUS } from "@/config/http.config";
import { Request } from "express";
import { AppError } from "@/lib/utils/app-error";
import { AuthService } from "@/modules/auth/auth.module";

export class SubmissionController {
    constructor(
        private readonly submissionService: SubmissionService,
        private readonly authService: AuthService
    ) {}

    public getAdminSubmissions = asyncHandler(async (req: Request, res) => {
        const {
            page,
            limit,
            status,
            challengeId,
            sortBy,
            sortOrder
        } = req.query;

        const submissions = await this.submissionService.getSubmissions({
            page: page ? parseInt(page as string) : undefined,
            limit: limit ? parseInt(limit as string) : undefined,
            status: status as 'PENDING' | 'APPROVED' | 'REJECTED',
            challengeId: challengeId as string,
            sortBy: sortBy as 'submittedAt' | 'createdAt' | 'updatedAt',
            sortOrder: sortOrder as 'asc' | 'desc'
        });

        return res.status(HTTPSTATUS.OK).json(submissions);
    });

    public getUserSubmissions = asyncHandler(async (req: Request, res) => {
        const session = await this.authService.getSession(req, res);
        if (!session) {
            return res.status(HTTPSTATUS.OK).json({ 
                data: [], 
                pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } 
            });
        }

        const submissions = await this.submissionService.getSubmissions(req.query, session.user.id);
        return res.status(HTTPSTATUS.OK).json(submissions);
    });

    public getSubmission = asyncHandler(async (req: Request, res) => {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Submission ID is required", HTTPSTATUS.BAD_REQUEST);
        }

        const session = await this.authService.getSession(req, res);
        if (!session) {
            throw new AppError("Unauthorized", HTTPSTATUS.UNAUTHORIZED);
        }

        const submission = await this.submissionService.getSubmission(id, session.user.id);
        return res.status(HTTPSTATUS.OK).json(submission);
    });

    public createSubmission = asyncHandler(async (req: Request, res) => {
        const session = await this.authService.getSession(req, res);
        if (!session) {
            throw new AppError("Unauthorized", HTTPSTATUS.UNAUTHORIZED);
        }

        const submission = await this.submissionService.createSubmission(req.cleanBody, session.user.id);
        return res.status(HTTPSTATUS.CREATED).json(submission);
    });

    public updateSubmission = asyncHandler(async (req: Request, res) => {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Submission ID is required", HTTPSTATUS.BAD_REQUEST);
        }



        const session = await this.authService.getSession(req, res);
        if (!session) {
            throw new AppError("Unauthorized", HTTPSTATUS.UNAUTHORIZED);
        }

        console.log(req.cleanBody)

        const submission = await this.submissionService.updateSubmission(id, req.cleanBody, session.user.id);
        return res.status(HTTPSTATUS.OK).json(submission);
    });

    public deleteSubmission = asyncHandler(async (req: Request, res) => {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Submission ID is required", HTTPSTATUS.BAD_REQUEST);
        }

        const session = await this.authService.getSession(req, res);
        if (!session) {
            throw new AppError("Unauthorized", HTTPSTATUS.UNAUTHORIZED);
        }

        const result = await this.submissionService.deleteSubmission(id, session.user.id);
        return res.status(HTTPSTATUS.OK).json(result);
    });
}
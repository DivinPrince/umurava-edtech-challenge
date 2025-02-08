import db from "@/lib/db";
import { AppError } from "@/lib/utils/app-error";
import { HTTPSTATUS } from "@/config/http.config";
import { CreateSubmissionInput, GetSubmissionsInput, UpdateSubmissionInput } from "./submission.schema";

export class SubmissionService {
    public async getSubmissions(params: GetSubmissionsInput = {}, userId?: string) {
        const {
            page = 1,
            limit = 10,
            status,
            challengeId,
            sortBy = 'submittedAt',
            sortOrder = 'desc'
        } = params;

        const skip = (page - 1) * limit;

        // Build where clause based on filters
        const where: any = {};
        
        if (status) {
            where.status = status;
        }
        
        if (challengeId) {
            where.challengeId = challengeId;
        }

        if (userId) {
            where.userId = userId;
        }

        // Get total count for pagination
        const total = await db.submission.count({ where });

        // Get paginated results with user and challenge data
        const submissions = await db.submission.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                challenge: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        });

        return {
            data: submissions,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    public async createSubmission(data: CreateSubmissionInput, userId: string) {
        // Check if challenge exists
        const challenge = await db.challenge.findUnique({
            where: { id: data.challengeId }
        });

        if (!challenge) {
            throw new AppError("Challenge not found", HTTPSTATUS.NOT_FOUND);
        }

        // Check if user has already submitted for this challenge
        const existingSubmission = await db.submission.findUnique({
            where: {
                userId_challengeId: {
                    userId,
                    challengeId: data.challengeId
                }
            }
        });

        if (existingSubmission) {
            throw new AppError("You have already submitted for this challenge", HTTPSTATUS.BAD_REQUEST);
        }

        // Check if challenge deadline has passed
        if (challenge.deadline < new Date()) {
            throw new AppError("Challenge deadline has passed", HTTPSTATUS.BAD_REQUEST);
        }

        const submission = await db.submission.create({
            data: {
                ...data,
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                challenge: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        });

        return submission;
    }

    public async updateSubmission(id: string, data: UpdateSubmissionInput, userId: string) {
        // Check if submission exists and get user role
        const [submission, user] = await Promise.all([
            db.submission.findUnique({
                where: { id }
            }),
            db.user.findUnique({
                where: { id: userId }
            })
        ]);
        console.log(data)
        if (!submission) {
            throw new AppError("Submission not found", HTTPSTATUS.NOT_FOUND);
        }

        // Check permissions
        const isAdmin = user?.role === 'admin';
        const isOwner = submission.userId === userId;

        if (!isAdmin) {
            // If not admin, user must own the submission
            if (!isOwner) {
                throw new AppError("You don't have permission to update this submission", HTTPSTATUS.FORBIDDEN);
            }
            
            // Owner can't update if status is REVIEWED
            if (submission.status === 'REVIEWED') {
                throw new AppError("Cannot update submission after it has been reviewed", HTTPSTATUS.FORBIDDEN);
            }

            // Remove status and feedback fields from update data for non-admin users
            const { status, feedback, ...allowedData } = data;
            data = allowedData;
        }

        const updatedSubmission = await db.submission.update({
            where: { id },
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                challenge: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        });

        return updatedSubmission;
    }

    public async getSubmission(id: string, userId: string) {
        const submission = await db.submission.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                challenge: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        });

        if (!submission) {
            throw new AppError("Submission not found", HTTPSTATUS.NOT_FOUND);
        }

        // Check if user is admin or submission owner
        const user = await db.user.findUnique({
            where: { id: userId }
        });

        if (user?.role !== 'admin' && submission.userId !== userId) {
            throw new AppError("You don't have permission to view this submission", HTTPSTATUS.FORBIDDEN);
        }

        return submission;
    }

    public async deleteSubmission(id: string, userId: string) {
        // Check if submission exists
        const submission = await db.submission.findUnique({
            where: { id }
        });

        if (!submission) {
            throw new AppError("Submission not found", HTTPSTATUS.NOT_FOUND);
        }

        // Check if user is admin or submission owner
        const user = await db.user.findUnique({
            where: { id: userId }
        });

        if (user?.role !== 'admin' && submission.userId !== userId) {
            throw new AppError("You don't have permission to delete this submission", HTTPSTATUS.FORBIDDEN);
        }

        await db.submission.delete({
            where: { id }
        });

        return { message: "Submission deleted successfully" };
    }
}

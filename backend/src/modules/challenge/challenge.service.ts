import db from "@/lib/db";
import { AppError } from "@/lib/utils/app-error";
import { HTTPSTATUS } from "@/config/http.config";
import { GetChallengesInput, CreateChallengeInput, UpdateChallengeInput } from "./challenge.schema";

export class ChallengeService {
    private determineStatus(challenge: any, now: Date = new Date()): 'completed' | 'ongoing' | 'open' {
        if (challenge.deadline < now) {
            return 'completed';
        }
        if (challenge._count?.submissions > 0) {
            return 'ongoing';
        }
        return 'open';
    }

    public async getChallenges(params: GetChallengesInput = {}) {
        const {
            page = 1,
            limit = 10,
            title,
            search,
            minPrize,
            maxPrize,
            deadline,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            filter
        } = params;

        const skip = (page - 1) * limit;

        // Build where clause based on filters
        const where: any = {};
        if (search) {
            const searchTerm = search.trim();
            where.OR = [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
                { projectBrief: { contains: searchTerm, mode: 'insensitive' } },
                { projectDescription: { contains: searchTerm, mode: 'insensitive' } },
                { projectRequirements: { contains: searchTerm, mode: 'insensitive' } },
            ];
        } else if (title) {
            where.title = { contains: title, mode: 'insensitive' };
        }
        
        if (minPrize || maxPrize) {
            where.prize = {};
            if (minPrize) where.prize.gte = minPrize;
            if (maxPrize) where.prize.lte = maxPrize;
        }
        
        if (deadline) {
            where.deadline = { lte: new Date(deadline) };
        }

        // Add status-based filtering
        const now = new Date();
        if (filter) {
            switch (filter) {
                case 'completed':
                    where.deadline = { lt: now };
                    break;
                case 'ongoing':
                    where.AND = [
                        { deadline: { gt: now } },
                        { submissions: { some: {} } }
                    ];
                    break;
                case 'open':
                    where.AND = [
                        { deadline: { gt: now } },
                        { submissions: { none: {} } }
                    ];
                    break;
            }
        }

        // Get total count for pagination
        const total = await db.challenge.count({ where });
        // Get paginated results
        const challenges = await db.challenge.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder
            },
            include: {
                _count: {
                    select: {
                        submissions: true
                    }
                }
            }
        });

        const challengesWithStatus = challenges.map(challenge => ({
            ...challenge,
            status: this.determineStatus(challenge, now)
        }));

        return {
            data: challengesWithStatus,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    public async createChallenge(data: CreateChallengeInput) {
        const slug = this.generateSlug(data.title);

        // Check if challenge with same slug exists
        const existingChallenge = await db.challenge.findUnique({
            where: { slug }
        });

        if (existingChallenge) {
            throw new AppError("Challenge with similar title already exists", HTTPSTATUS.BAD_REQUEST);
        }

        const challenge = await db.challenge.create({
            data: {
                ...data,
                slug
            }
        });

        return challenge;
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    public async updateChallenge(id: string, data: UpdateChallengeInput) {
        // Check if challenge exists
        const existingChallenge = await db.challenge.findUnique({
            where: { id }
        });

        if (!existingChallenge) {
            throw new AppError("Challenge not found", HTTPSTATUS.NOT_FOUND);
        }

        // If title is being updated, generate new slug and check for duplicates
        let slug;
        if (data.title) {
            slug = this.generateSlug(data.title);
            const challengeWithSlug = await db.challenge.findFirst({
                where: { 
                    slug,
                    id: { not: id }
                }
            });

            if (challengeWithSlug) {
                throw new AppError("Challenge with similar title already exists", HTTPSTATUS.BAD_REQUEST);
            }
        }

        // Update the challenge
        const updatedChallenge = await db.challenge.update({
            where: { id },
            data: {
                ...data,
                ...(slug && { slug })
            }
        });

        return updatedChallenge;
    }

    public async getChallenge(identifier: string, type: 'id' | 'slug' = 'id') {
        try {
            const challenge = await db.challenge.findUnique({
                where: type === 'id' ? { id: identifier } : { slug: identifier },
                include: {
                    _count: {
                        select: {
                            submissions: true
                        }
                    }
                }
            });

            if (!challenge) {
                throw new AppError("Challenge not found", HTTPSTATUS.NOT_FOUND);
            }

            return {
                ...challenge,
                status: this.determineStatus(challenge)
            };
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            if (error.code === 'P2023') {
                throw new AppError("Invalid challenge identifier format", HTTPSTATUS.BAD_REQUEST);
            }
            throw error;
        }
    }

    public async deleteChallenge(id: string) {
        // Check if challenge exists
        const existingChallenge = await db.challenge.findUnique({
            where: { id }
        });

        if (!existingChallenge) {
            throw new AppError("Challenge not found", HTTPSTATUS.NOT_FOUND);
        }

        // Delete the challenge
        await db.challenge.delete({
            where: { id }
        });

        return { message: "Challenge deleted successfully" };
    }

    public async getParticipants(challengeId: string, params: { page?: number; limit?: number } = {}) {
        const {
            page = 1,
            limit = 10
        } = params;

        // Check if challenge exists
        const challenge = await db.challenge.findUnique({
            where: { id: challengeId }
        });

        if (!challenge) {
            throw new AppError("Challenge not found", HTTPSTATUS.NOT_FOUND);
        }

        const skip = (page - 1) * limit;

        // Get total count of unique participants
        const total = await db.user.count({
            where: {
                submissions: {
                    some: { challengeId }
                }
            }
        });

        // Get paginated unique participants
        const participants = await db.user.findMany({
            where: {
                submissions: {
                    some: { challengeId }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                skills: true,
                image: true
            },
            skip,
            take: limit,
            orderBy: {
                name: 'asc'
            }
        });

        return {
            data: participants,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    public async getSubmissions(challengeId: string, params: { page?: number; limit?: number, sortBy?: string, sortOrder?: string } = {}) {
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = params;

        // Check if challenge exists
        const challenge = await db.challenge.findUnique({
            where: { id: challengeId }
        });

        if (!challenge) {
            throw new AppError("Challenge not found", HTTPSTATUS.NOT_FOUND);
        }

        const skip = (page - 1) * limit;

        // Get total count of unique participants
        const total = await db.submission.count({
            where: {
                challengeId
            }
        });

        // Get paginated unique participants
        const submissions = await db.submission.findMany({
            where: {
                challengeId
            },
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder
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

    public async getUserSubmission(challengeId: string, userId: string) {
        // First verify the challenge exists
        const challenge = await db.challenge.findUnique({
            where: { id: challengeId }
        });

        if (!challenge) {
            throw new AppError("Challenge not found", HTTPSTATUS.NOT_FOUND);
        }

        // Get the user's submission
        const submission = await db.submission.findFirst({
            where: {
                userId: userId,
                challengeId: challengeId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        skills: true
                    }
                }
            }
        });

        if (!submission) {
            throw new AppError("Submission not found", HTTPSTATUS.NOT_FOUND);
        }

        return submission;
    }
}
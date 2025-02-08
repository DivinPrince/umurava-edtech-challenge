export interface Challenge {
    id: string;
    title: string;
    slug: string;
    description: string;
    deadline: string;
    duration: string;
    prize: number;
    contactEmail: string;
    projectBrief: string;
    projectDescription: string;
    status: 'completed' | 'ongoing' | 'open';
    projectRequirements: string;
    skillsRequired: string[];
    seniorityLevers: string[];
    deliverables: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateChallengeRequest {
    title: string;
    description: string;
    deadline: string;
    duration: string;
    prize: number;
    contactEmail: string;
    projectBrief: string;
    projectDescription: string;
    projectRequirements: string;
    skillsRequired: string[];
    seniorityLevers: string[];
    deliverables: string;
}

export interface UpdateChallengeRequest extends Partial<CreateChallengeRequest> {
    id: string;
}

export interface GetChallengesParams {
    page?: number;
    limit?: number;
    title?: string;
    minPrize?: number;
    maxPrize?: number;
    deadline?: string;
    search?: string;
    filter?: 'completed' | 'open' | 'ongoing';
    sortBy?: 'createdAt' | 'deadline' | 'prize';
    sortOrder?: 'asc' | 'desc';
}

export interface GetChallengesResponse {
    data: Challenge[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}

export interface ChallengeParticipant {
    id: string,
    name: string,
    email: string,
    skills: string[],
    image: string
}

export interface GetChallengeParticipantsParams {
    page?: number;
    limit?: number;
}

export interface GetChallengeParticipantsResponse {
    data: ChallengeParticipant[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface GetChallengeSubmissionsParams {
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'status';
    sortOrder?: 'asc' | 'desc';
}

export interface ChallengeSubmission {
    status: string;
    createdAt: Date;
    id: string;
    updatedAt: Date;
    challengeId: string;
    userId: string;
    content: string;
    feedback: string | null;
    submittedAt: Date;
}

export interface GetChallengeSubmissionsResponse {
    data: ChallengeSubmission[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}


import { z } from 'zod';

export const createSubmissionSchema = z.object({
    challengeId: z.string().min(1, "Challenge ID is required"),
    content: z.string().min(1, "Submission content is required"),
});

export const updateSubmissionSchema = z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'REVIEWED']).optional(),
    feedback: z.string().optional(),
    content: z.string().optional(),
});

export const getSubmissionsSchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    limit: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'REVIEWED']).optional(),
    challengeId: z.string().optional(),
    sortBy: z.enum(['submittedAt', 'createdAt', 'updatedAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional()
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema>;
export type GetSubmissionsInput = z.infer<typeof getSubmissionsSchema>; 
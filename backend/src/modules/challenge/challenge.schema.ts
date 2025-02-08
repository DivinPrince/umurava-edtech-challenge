import { z } from 'zod';

export const createChallengeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    deadline: z.string().transform((val) => new Date(val)),
    duration: z.string().min(1, "Duration is required"),
    prize: z.number().positive("Prize must be a positive number"),
    contactEmail: z.string().email("Invalid email format"),
    projectBrief: z.string().min(1, "Project brief is required"),
    projectDescription: z.string().min(1, "Project description is required"),
    projectRequirements: z.string().min(1, "Project requirements are required"),
    skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
    seniorityLevers: z.array(z.string()).min(1, "At least one seniority level is required"),
    deliverables: z.string().min(1, "Deliverables are required")
});

export const getChallengesSchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    limit: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    title: z.string().optional(),
    search: z.string().optional(),
    minPrize: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    maxPrize: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    deadline: z.string().optional().transform(val => val ? new Date(val) : undefined),
    sortBy: z.enum(['createdAt', 'deadline', 'prize']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    filter: z.enum(['completed', 'ongoing', 'open']).optional()
});

export const getSubmissionsSchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    limit: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    sortBy: z.enum(['createdAt', 'status']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional()
});

export const updateChallengeSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    deadline: z.string().transform((val) => new Date(val)).optional(),
    duration: z.string().min(1, "Duration is required").optional(),
    prize: z.number().positive("Prize must be a positive number").optional(),
    contactEmail: z.string().email("Invalid email format").optional(),
    projectBrief: z.string().min(1, "Project brief is required").optional(),
    projectDescription: z.string().min(1, "Project description is required").optional(),
    projectRequirements: z.string().min(1, "Project requirements are required").optional(),
    skillsRequired: z.array(z.string()).min(1, "At least one skill is required").optional(),
    seniorityLevers: z.array(z.string()).min(1, "At least one seniority level is required").optional(),
    deliverables: z.string().min(1, "Deliverables are required").optional()
});

export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
export type GetChallengesInput = z.infer<typeof getChallengesSchema>;
export type UpdateChallengeInput = z.infer<typeof updateChallengeSchema>; 
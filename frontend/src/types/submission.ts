export type SubmissionStatus = 'PENDING' | "REVIEWED" | "APPROVED" | "REJECTED";

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  content: string;
  status: SubmissionStatus;
  feedback?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  challenge: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface CreateSubmissionRequest {
  challengeId: string;
  content: string;
}

export interface UpdateSubmissionRequest {
  id: string;
  status?: SubmissionStatus;
  feedback?: string;
  content?: string;
}

export interface GetSubmissionsParams {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
  challengeId?: string;
  sortBy?: 'submittedAt' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface GetSubmissionsResponse {
  data: Submission[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} 
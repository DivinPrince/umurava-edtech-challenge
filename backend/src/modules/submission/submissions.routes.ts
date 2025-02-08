import { Router } from 'express';
import { validateData } from '@/middlewares/validation';
import { requireAdmin, requireAuth } from '@/middlewares/auth-handler';
import { submissionController } from './submission.module';
import { createSubmissionSchema, updateSubmissionSchema, getSubmissionsSchema } from './submission.schema';

const router = Router();
// Get all submissions (admin only)
router.get('/admin', requireAdmin, validateData(getSubmissionsSchema), submissionController.getAdminSubmissions);

// Get user's submissions
router.get('/', validateData(getSubmissionsSchema), submissionController.getUserSubmissions);

// Get a specific submission
router.get('/:id', submissionController.getSubmission);

// Create a submission
router.post('/', validateData(createSubmissionSchema), submissionController.createSubmission);

// Update a submission
router.patch('/:id', requireAuth, validateData(updateSubmissionSchema), submissionController.updateSubmission);

// Delete a submission
router.delete('/:id', requireAdmin, submissionController.deleteSubmission);

export default router;
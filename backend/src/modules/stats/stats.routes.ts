import { Router } from 'express';
import { StatsController } from './stats.controller';
import { getStatsSchema } from './stats.schema';
import { validateQuery } from '@/middlewares/validation';
import { requireAdmin, requireAuth } from '@/middlewares/auth-handler';
import { statsController } from './stats.module';

const router = Router();

// User stats routes
router.get(
    '/user',
    requireAuth,
    statsController.getUserStats
);

// Admin stats routes
router.get(
    '/challenges/total',
    requireAdmin,
    statsController.getTotalChallengesStats
);

router.get(
    '/challenges/participants',
    requireAdmin,
    statsController.getParticipantsStats
);

router.get(
    '/challenges/open',
    requireAdmin,
    statsController.getOpenChallengesStats
);
router.get(
    '/challenges/ongoing',
    requireAdmin,
    statsController.getOngoingChallengesStats
);
router.get(
    '/challenges/completed',
    requireAdmin,
    statsController.getCompletedChallengesStats
);


export default router;
import { Router } from "express"
import { challengeController } from "./challenge.module"
import { requireAdmin, requireAuth, requireOwner } from "@/middlewares/auth-handler"
import { validateData } from "@/middlewares/validation"
import { createChallengeSchema, getSubmissionsSchema, updateChallengeSchema } from "./challenge.schema"

const router = Router()

router.get("/", challengeController.getChallenges)
router.post("/", validateData(createChallengeSchema), requireAdmin, challengeController.createChallenge)
router.get("/:id/participants", requireAdmin, challengeController.getParticipants)
router.get("/:id/submissions/:userId", requireOwner, challengeController.getUserSubmission)
router.get("/:id/submissions", requireAdmin, validateData(getSubmissionsSchema), challengeController.getSubmissions)
router.put("/:id", requireAdmin, validateData(updateChallengeSchema), challengeController.updateChallenge)
router.delete("/:id", requireAdmin, challengeController.deleteChallenge)
router.get("/:type/:identifier", challengeController.getChallenge)

export default router
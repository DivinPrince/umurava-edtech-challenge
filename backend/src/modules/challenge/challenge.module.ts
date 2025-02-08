import { ChallengeController } from "./challenge.controller";
import { ChallengeService } from "./challenge.service";
import { AuthService } from "../auth/auth.service";

const challengeService = new ChallengeService();
const authService = new AuthService();
const challengeController = new ChallengeController(challengeService, authService);

export { challengeService, challengeController };
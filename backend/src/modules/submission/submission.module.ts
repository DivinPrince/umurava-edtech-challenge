import { SubmissionService } from "./submission.service";
import { SubmissionController } from "./submission.controller";
import { AuthService } from "@/modules/auth/auth.module";

const submissionService = new SubmissionService();
const authService = new AuthService();
const submissionController = new SubmissionController(submissionService, authService);

export { SubmissionService, SubmissionController, submissionController };

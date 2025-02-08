import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";

const statsService = new StatsService();
const statsController = new StatsController(statsService);

export { StatsService, StatsController, statsController };

import db from "@/lib/db";
import { StatWithTrend } from "./stats.schema";
import { differenceInDays, subDays } from "date-fns";

export class StatsService {
    public async getUserStats() {
        const now = new Date();

        // Get open challenges (no submissions yet and not expired)
        const openChallenges = await db.challenge.count({
            where: {
                deadline: {
                    gt: now
                },
                submissions: {
                    none: {}  // No submissions yet
                }
            }
        });

        // Get ongoing challenges (has submissions and not expired)
        const ongoingChallenges = await db.challenge.count({
            where: {
                deadline: {
                    gt: now
                },
                submissions: {
                    some: {}  // Has at least one submission
                }
            }
        });

        // Get completed challenges (past deadline)
        const completedChallenges = await db.challenge.count({
            where: {
                deadline: {
                    lt: now
                }
            }
        });

        return {
            openChallenges,
            ongoingChallenges,
            completedChallenges
        };
    }
    public async getTotalChallengesStats(startDate: Date, endDate: Date): Promise<StatWithTrend> {
        // Get current period count
        const currentCount = await db.challenge.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });

        // Get previous period count for trend calculation
        const previousCount = await this.getPreviousPeriodStats(
            'challenges',
            startDate,
            endDate
        );

        // Return count with trend calculation
        return {
            count: currentCount,
            ...this.calculateTrend(currentCount, previousCount)
        };
    }
    
    public async getParticipantsStats(startDate: Date, endDate: Date): Promise<StatWithTrend> {
        const now = new Date();
        // Get current period count
        const currentCount = await db.user.count({
            where: {
                submissions: {
                    some: {
                        createdAt: {
                            gte: startDate,
                            lte: endDate
                        }
                    }
                }
            }
        });

        // Get previous period count for trend calculation
        const previousCount = await this.getPreviousPeriodStats(
            'participants',
            startDate,
            endDate
        );

        return {
            count: currentCount,
            ...this.calculateTrend(currentCount, previousCount)
        };
    }

    public async getOpenChallengesStats(startDate: Date, endDate: Date): Promise<StatWithTrend> {
        const now = new Date();
        // Get current period count
        const currentCount = await db.challenge.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                },
                deadline: {
                    gt: now
                },
                submissions: {
                    none: {}  // No submissions yet
                }
            }
        });

        // Get previous period count for trend calculation
        const previousCount = await this.getPreviousPeriodStats(
            'openChallenges',
            startDate,
            endDate
        );

        return {
            count: currentCount,
            ...this.calculateTrend(currentCount, previousCount)
        };
    }

    public async getOngoingChallengesStats(startDate: Date, endDate: Date): Promise<StatWithTrend> {
        const now = new Date();
        // Get current period count
        const currentCount = await db.challenge.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                },
                deadline: {
                    gt: now
                },
                submissions: {
                    some: {}  // Has at least one submission
                }
            }
        });

        // Get previous period count for trend calculation
        const previousCount = await this.getPreviousPeriodStats(
            'ongoingChallenges',
            startDate,
            endDate
        );

        return {
            count: currentCount,
            ...this.calculateTrend(currentCount, previousCount)
        };
    }

    public async getCompletedChallengesStats(startDate: Date, endDate: Date): Promise<StatWithTrend> {
        const now = new Date();
        // Get current period count
        const currentCount = await db.challenge.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                },
                deadline: {
                    lt: now
                }
            }
        });

        // Get previous period count for trend calculation
        const previousCount = await this.getPreviousPeriodStats(
            'completedChallenges',
            startDate,
            endDate
        );

        return {
            count: currentCount,
            ...this.calculateTrend(currentCount, previousCount)
        };
    }

    private async getPreviousPeriodStats(
        metricType: 'challenges' | 'participants' | 'openChallenges' | 'ongoingChallenges' | 'completedChallenges',
        endDate: Date,
        currentEndDate: Date
    ): Promise<number> {
        const now = new Date();
        const periodLength = differenceInDays(currentEndDate, endDate);
        const previousStartDate = subDays(endDate, periodLength);

        switch (metricType) {
            case 'challenges':
                return await db.challenge.count({
                    where: {
                        createdAt: {
                            gte: previousStartDate,
                            lt: endDate
                        }
                    }
                });
            case 'participants':
                return await db.user.count({
                    where: {
                        submissions: {
                            some: {
                                createdAt: {
                                    gte: previousStartDate,
                                    lt: endDate
                                }
                            }
                        }
                    }
                });
            case 'openChallenges':
                return await db.challenge.count({
                    where: {
                        createdAt: {
                            gte: previousStartDate,
                            lt: endDate
                        },
                        deadline: {
                            gt: now
                        },
                        submissions: {
                            none: {}
                        }
                    }
                });
            case 'ongoingChallenges':
                return await db.challenge.count({
                    where: {
                        createdAt: {
                            gte: previousStartDate,
                            lt: endDate
                        },
                        deadline: {
                            gt: now
                        },
                        submissions: {
                            some: {}
                        }
                    }
                });
            case 'completedChallenges':
                return await db.challenge.count({
                    where: {
                        createdAt: {
                            gte: previousStartDate,
                            lt: endDate
                        },
                        deadline: {
                            lt: now
                        }
                    }
                });
        }
    }

    private calculateTrend(current: number, previous: number): { percentage: number; direction: 'up' | 'down' } {
        const percentage = previous === 0 ? 100 : ((current - previous) / previous) * 100;
        return {
            percentage: Math.round(percentage),
            direction: percentage >= 0 ? 'up' : 'down'
        };
    }
} 
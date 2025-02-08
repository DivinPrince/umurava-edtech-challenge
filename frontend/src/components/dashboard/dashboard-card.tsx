"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Note } from "../ui/icons"
import { useGetUserStatsQuery } from "@/lib/redux/features/statsApi"
import { Skeleton } from "../ui/skeleton"

type ChallengeType = 'open' | 'ongoing' | 'completed';
type StatsKey = `${ChallengeType}Challenges`;

interface ChallengeCardProps {
  type: ChallengeType
  accentColor?: string
}

const CARD_CONFIG = {
  open: {
    title: "Open Challenges",
    key: "openChallenges" as StatsKey,
  },
  ongoing: {
    title: "Ongoing Challenges",
    key: "ongoingChallenges" as StatsKey,
  },
  completed: {
    title: "Completed Challenges",
    key: "completedChallenges" as StatsKey,
  },
}

export function DashboardCard({ type, accentColor = "bg-primary" }: ChallengeCardProps) {
  const { data: stats, isLoading } = useGetUserStatsQuery()
  const config = CARD_CONFIG[type]

  return (
    <Card className="relative flex items-start p-6 px-8">
      <div className={cn("absolute left-4 top-1/2 -translate-y-1/2 h-1/2 w-1.5 rounded-full", accentColor)} />
      <div className="flex-1 flex flex-col justify-between h-full">
        <h3 className="text-lg font-medium text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{config.title}</h3>
        <p className="mt-2 text-2xl font-semibold">
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            stats?.[config.key] || 0
          )}
        </p>
      </div>
      <div className={cn("rounded-full size-16 bg-blue-50 hover:bg-blue-100 aspect-square flex items-center justify-center")}>
        <Note className="size-7 text-primary" />
      </div>
    </Card>
  )
}
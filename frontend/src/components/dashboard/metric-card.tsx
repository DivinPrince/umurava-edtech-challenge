"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Note } from "../ui/icons"
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  useGetTotalChallengesStatsQuery,
  useGetParticipantsStatsQuery,
  useGetOpenChallengesStatsQuery,
  useGetOngoingChallengesStatsQuery,
  useGetCompletedChallengesStatsQuery,
  type DateRange
} from "@/lib/redux/features/statsApi"
import { useState } from "react"
import { startOfWeek, endOfWeek, subWeeks, startOfMonth, endOfMonth, subMonths, format } from "date-fns"

type MetricType = 'total' | 'participants' | 'open' | 'ongoing' | 'completed';

interface MetricsCardProps {
  type: MetricType;
}

const METRIC_CONFIG = {
  total: {
    label: 'Total Challenges',
    icon: Note,
    useQuery: useGetTotalChallengesStatsQuery,
  },
  participants: {
    label: 'Total Participants',
    icon: Users,
    useQuery: useGetParticipantsStatsQuery,
  },
  open: {
    label: 'Open Challenges',
    icon: Clock,
    useQuery: useGetOpenChallengesStatsQuery,
  },
  ongoing: {
    label: 'Ongoing Challenges',
    icon: CheckCircle,
    useQuery: useGetOngoingChallengesStatsQuery,
  },
  completed: {
    label: 'Completed Challenges',
    icon: XCircle,
    useQuery: useGetCompletedChallengesStatsQuery,
  },
}

const TIME_RANGES = {
  'this-week': {
    startDate: format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
    endDate: format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
  },
  'last-week': {
    startDate: format(startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
    endDate: format(endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
  },
  'this-month': {
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
  },
  'last-month': {
    startDate: format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd'),
  },
}

export default function MetricsCard({ type }: MetricsCardProps) {
  const [timeRange, setTimeRange] = useState<keyof typeof TIME_RANGES>('this-week')
  
  const useStatsQuery = METRIC_CONFIG[type].useQuery
  const { data: stats, isLoading } = useStatsQuery(TIME_RANGES[timeRange] as DateRange)

  const config = METRIC_CONFIG[type]
  const Icon = config.icon

  return (
    <div className="w-full">
      <Card className="relative p-4 w-full">
        <Select value={timeRange} onValueChange={(value: keyof typeof TIME_RANGES) => setTimeRange(value)}>
          <SelectTrigger className="absolute right-4 top-2 h-8 w-[110px] border-0 bg-transparent p-0 text-sm text-gray-500 [&>span]:flex [&>span]:items-center [&>span]:gap-1 focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-6 min-h-[7rem]">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="size-7 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-semibold">{config.label}</p>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-6 w-20" />
                </>
              ) : (
                <>
                  <span className="text-lg font-semibold">{stats?.count || 0}</span>
                  {stats && (
                    <span className={`flex items-center text-sm font-medium ${
                      stats.direction === 'up' ? 'text-primary bg-primary/10' : 'text-destructive bg-destructive/10'
                    } rounded-full px-2`}>
                      <span className="mr-1">{stats.direction === 'up' ? '↑' : '↓'}</span>
                      {stats.percentage}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
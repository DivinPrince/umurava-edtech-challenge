"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FileIcon } from './ui/icons'
import { useGetUserStatsQuery } from '@/lib/redux/features/statsApi'
import { parseAsString } from 'nuqs'
import { useQueryState } from 'nuqs'
import { Skeleton } from './ui/skeleton'

interface FilterButtonProps {
    label: string
    count: number
    isActive?: boolean
    snap?: boolean
    onClick?: () => void
    loading?: boolean
}

const FilterButton = ({ label, count, isActive = false, snap, onClick, loading = false }: FilterButtonProps) => {
    const baseColors = isActive
        ? "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
        : "bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200"

    const badgeColors = isActive
        ? "bg-blue-100 text-blue-600"
        : "bg-gray-200 text-gray-600"

    return (
        <Button 
            variant="secondary" 
            size="lg" 
            className={cn(baseColors, "w-fit p-4", snap ? "snap-start" : "")}
            onClick={onClick}
        >
            <FileIcon className="h-4 w-4" />
            {label}
            {loading ? (
                <Skeleton className="ml-2 h-5 w-8 rounded-full" />
            ) : (
                <span className={cn("ml-2 rounded-full px-2 py-0.5 text-xs font-medium", badgeColors)}>
                    {count}
                </span>
            )}
        </Button>
    )
}

const Filters = () => {
    const [activeFilter, setActiveFilter] = useQueryState('filter', parseAsString.withDefault('all'))
    
    const { data: stats, isLoading } = useGetUserStatsQuery()

    const totalChallenges = (stats?.openChallenges || 0) + 
                           (stats?.completedChallenges || 0) + 
                           (stats?.ongoingChallenges || 0)

    return (
        <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-x-2">
                <FilterButton 
                    label="All Challenges" 
                    count={totalChallenges} 
                    isActive={activeFilter === 'all'} 
                    onClick={() => setActiveFilter('all')}
                    loading={isLoading}
                />
                <FilterButton 
                    label="Completed Challenges" 
                    count={stats?.completedChallenges || 0} 
                    isActive={activeFilter === 'completed'}
                    onClick={() => setActiveFilter('completed')}
                    loading={isLoading}
                />
                <FilterButton 
                    label="Open Challenges" 
                    count={stats?.openChallenges || 0} 
                    isActive={activeFilter === 'open'}
                    onClick={() => setActiveFilter('open')}
                    loading={isLoading}
                />
                <FilterButton 
                    label="Ongoing Challenges" 
                    count={stats?.ongoingChallenges || 0} 
                    isActive={activeFilter === 'ongoing'}
                    onClick={() => setActiveFilter('ongoing')}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}

export default Filters


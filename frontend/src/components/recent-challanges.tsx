"use client"

import Link from "next/link"
import ChallengeCard, { ChallengeCardSkeleton } from "@/components/challenge/challenge-card"
import { useGetChallengesQuery } from "@/lib/redux/features/challengeApi"
import { useMode } from "@/hooks/use-mode"
import { useGetChallengeUrl } from "@/hooks/use-get-challenge-url"
import { ChevronRight } from "lucide-react"

export default function RecentChallenges() {
  const mode = useMode()
  const { data, isLoading } = useGetChallengesQuery({
    page: 1,
    limit: 9,
    sortBy: "createdAt",
    sortOrder: "desc"
  })

  const getChallengeUrl = useGetChallengeUrl

  if (!data?.data && !isLoading) {
    return <div>No challenges found</div>
  }


  const challenges = data?.data.map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    skills: challenge.skillsRequired,
    seniority: challenge.seniorityLevers.join(', ') || '',
    timeline: challenge.duration,
    status: challenge.status,
    url: getChallengeUrl(challenge.slug)
  })) || []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Recent Challenges</h2>
        <Link href={`/dashboard/${mode == "admin" ? "/admin/" : "" }challenges-hackathons`} className="text-primary flex items-center gap-3">
          See all <ChevronRight className="size-6" />
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <ChallengeCardSkeleton key={idx} />
          ))
        ) : (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        )}
      </div>
    </div>
  )
}


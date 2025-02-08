"use client"
import { useGetChallengesQuery } from "@/lib/redux/features/challengeApi"
import ChallengeCard, { ChallengeCardSkeleton } from "@/components/challenge/challenge-card"
import { Button } from "../ui/button"
import Link from "next/link"
import { useState } from "react"

const Explore = () => {
    const [page] = useState(1);
    const { data, isLoading, error } = useGetChallengesQuery({
        page,
        limit: 3,
    });

    return (
        <section className="py-20 px-4 md:px-8 lg:px-16">
            <div className="w-full md:max-w-5xl mx-auto space-y-12">
                <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-title">
                        Explore Challenges & Hackathons
                    </h2>
                    <p className="text-lg text-paragraph/70 text-pretty">
                        Join Skills Challenges Program to accelerate your career growth and become <br /> part of Africa&apos;s largest workforce of digital professionals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="w-full">
                                <ChallengeCardSkeleton />
                            </div>
                        ))
                    ) : error ? (
                        <div className="col-span-full text-center text-red-500">
                            Failed to load challenges
                        </div>
                    ) : (
                        data?.data.map((challenge) => (
                            <div key={challenge.id} className="w-full">
                                <ChallengeCard 
                                    challenge={{
                                        id: challenge.id,
                                        title: challenge.title,
                                        skills: challenge.skillsRequired,
                                        seniority: challenge.seniorityLevers.join(', ') || '',
                                        timeline: challenge.duration,
                                        url: `/challenges/${challenge.slug}`,
                                        status: challenge.status
                                    }}
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-center">
                    <Link href="/challenges">
                        <Button 
                            size="lg"
                            variant="outline"
                            className="bg-background text-primary border-primary hover:bg-primary hover:text-background transition-colors"
                        >
                            View More
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Explore
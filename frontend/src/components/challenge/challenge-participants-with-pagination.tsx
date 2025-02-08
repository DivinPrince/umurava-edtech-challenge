"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetParticipantsQuery, useGetChallengeQuery } from "@/lib/redux/features/challengeApi";
import { Skeleton } from "@/components/ui/skeleton";
import User from "../avatar";
import { useState } from "react";
import { SubmissionView } from "../submissions/talent/submission-view";

interface ChallengeParticipantsProps {
  slug: string;
}

export function ChallengeParticipantsWithPagination({ slug }: ChallengeParticipantsProps) {
  const [page, setPage] = useState(1);
  const limit = 5; // Number of items per page

  // First get the challenge data
  const { data: challenge, isLoading: isLoadingChallenge } = useGetChallengeQuery({ id: slug, type: 'slug' });

  // Then get participants once we have the challenge id
  const { data: participantsData, isLoading: isLoadingParticipants, isFetching } = useGetParticipantsQuery(
    {
      id: challenge?.id || '',
      params: {
        page,
        limit,
      },
    },
    {
      // Skip the query if we don't have the challenge id yet
      skip: !challenge?.id,
    }
  );

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (participantsData && page * limit < participantsData.pagination.total) {
      setPage(page + 1);
    }
  };

  const hasNextPage = participantsData ? page * limit < participantsData.pagination.total : false;
  const hasPreviousPage = page > 1;

  // Show loading state while getting challenge data
  if (isLoadingChallenge) {
    return (
      <Card className="h-fit divide-y">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-2 items-center p-6">
              <Skeleton className="size-11 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Show loading state while getting participants data
  if (isLoadingParticipants) {
    return (
      <Card className="h-fit divide-y">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Participants
            <Skeleton className="h-6 w-12 rounded-full" />
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-2 items-center p-6">
              <Skeleton className="size-11 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // If we don't have challenge data, don't render anything
  if (!challenge) return null;

  return (
    <Card className="h-fit divide-y">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Participants
          <span className="w-fit flex items-center text-sm font-medium text-primary-foreground bg-primary rounded-full px-2">
            {participantsData?.pagination.total || 0}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="divide-y p-0">
        {participantsData?.data.map((participant) => (
          <div key={participant.id} className="flex gap-2 justify-between items-center p-6">
            <div className="flex gap-2 items-center">
              <User
                className="size-11"
                image={participant.image}
                alt={`${participant.name}'s avatar`}
              />
              <div>
                <h3 className="font-semibold text-[#25272B]">
                  {participant.name}
                </h3>
                <p className="text-sm text-muted-foreground">{participant.skills.join(", ")}</p>
              </div>
            </div>

            <SubmissionView challengeSlug={slug} participantId={participant.id} mode="admin">
              <Button variant="outline" size="sm">
                View submission
              </Button>
            </SubmissionView>
          </div>
        ))}
        <div className="p-6 space-y-4">
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePreviousPage}
              disabled={!hasPreviousPage || isFetching}
            >
              Previous
            </Button>
            <Button
              size="lg"
              onClick={handleNextPage}
              disabled={!hasNextPage || isFetching}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

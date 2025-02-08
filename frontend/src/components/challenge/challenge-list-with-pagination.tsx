'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

import ChallengeCard, { ChallengeCardSkeleton } from '@/components/challenge/challenge-card';
import { useGetChallengesQuery } from '@/lib/redux/features/challengeApi';
import { GetChallengesParams } from '@/types/challenge';
import { useGetChallengeUrl } from '@/hooks/use-get-challenge-url';
import { parseAsString, useQueryState } from 'nuqs';

interface ChallengeListWithPaginationProps {
  initialParams?: Partial<GetChallengesParams>;
  paginationType?: 'button' | 'more';
  hideLoader?: boolean
}

export function ChallengeListWithPagination({
  initialParams = {},
  paginationType = 'button',
  hideLoader
}: ChallengeListWithPaginationProps) {
  const [page, setPage] = useState(1);
  const limit = 9; // Number of items per page
  const getChallengeUrl = useGetChallengeUrl;

  const [activeFilter] = useQueryState('filter', parseAsString.withDefault('all'))
  const [query] = useQueryState("q");

  const { data, isLoading, isFetching } = useGetChallengesQuery({
    page,
    limit,
    search: query || undefined,
    filter: activeFilter !== 'all' ? activeFilter as 'completed' | 'open' | 'ongoing' : undefined,
    ...initialParams,
  });

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && page * limit < data.pagination.total) {
      setPage(page + 1);
    }
  };

  const handleViewMore = () => {
    if (data && page * limit < data.pagination.total) {
      setPage(page + 1);
    }
  };

  // Process challenges data
  const challenges = data?.data.map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    skills: challenge.skillsRequired,
    seniority: challenge.seniorityLevers.join(', ') || '',
    timeline: challenge.duration,
    status: challenge.status,
    url: getChallengeUrl(challenge.slug)
  })) || [];

  const hasNextPage = data ? page * limit < data.pagination.total : false;
  const hasPreviousPage = page > 1;

  return (
    <div>
      {!hideLoader && (
        <Loader show={isFetching} text={`Fetching ${activeFilter} challenges...`} />
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
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

      {paginationType === 'button' ? (
        <div className="flex justify-between gap-4 mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePreviousPage}
            disabled={!hasPreviousPage || isFetching || isLoading}
          >
            Previous
          </Button>
          <Button
            size="lg"
            onClick={handleNextPage}
            disabled={!hasNextPage || isFetching || isLoading}
          >
            Next
          </Button>
        </div>
      ) : (
        hasNextPage && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewMore}
              disabled={isFetching || isLoading}
              className="w-full max-w-xs"
            >
              {isFetching ? 'Loading...' : 'View More'}
            </Button>
          </div>
        )
      )}
    </div>
  );
}

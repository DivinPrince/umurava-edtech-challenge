import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetParticipantsQuery } from "@/lib/redux/features/challengeApi";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import User from "../avatar";

interface ChallengeParticipantsProps {
  challengeId: string;
  slug: string;
}

export function ChallengeParticipants({ challengeId, slug }: ChallengeParticipantsProps) {
  const { data, isLoading } = useGetParticipantsQuery({
    id: challengeId,
    params: {
      page: 1,
      limit: 5,
    },
  });

  if (isLoading) {
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

  return (
    <Card className="h-fit divide-y">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Participants
          <span className="w-fit flex items-center text-sm font-medium text-primary-foreground bg-primary rounded-full px-2">
            {data?.pagination.total || 0}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="divide-y p-0">
        {data?.data.map((participant) => (
          <div key={participant.id} className="flex gap-2 items-center p-6">
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
        ))}
        <div className="p-6">
          <Button asChild variant="outline" className="w-full h-12" size="lg">
            <Link href={`/dashboard/admin/challenges-hackathons/${slug}/participants`}>
              View all
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

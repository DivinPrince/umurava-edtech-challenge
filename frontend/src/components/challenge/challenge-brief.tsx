"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Calendar,
  Money,
  BriefCase
} from "@/components/ui/icons"
import { Eye } from "lucide-react"

import { Button } from "../ui/button"
import { useMode } from "@/hooks/use-mode"
import { useRouter } from "next/navigation"
import { useGetChallengeQuery, useDeleteChallengeMutation } from "@/lib/redux/features/challengeApi"
import { useGetChallengeUrl } from "@/hooks/use-get-challenge-url"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"
import { ChallengeParticipants } from "./challenge-participants";
import { SubmitWork } from "../submissions/talent/submission-form"
import { SubmissionView } from "../submissions/talent/submission-view"
import { useGetUserSubmissionQuery } from "@/lib/redux/features/challengeApi"
import { useSession } from "@/lib/auth"

interface ChallengeBriefProps {
  slug: string;
}

export default function ChallengeBrief({ slug }: ChallengeBriefProps) {
  const mode = useMode();
  const router = useRouter();
  const { data: challenge, isLoading } = useGetChallengeQuery({ id: slug, type: 'slug' });
  const session = useSession();
  const { data: existingSubmission, isLoading: isLoadingSubmission } = useGetUserSubmissionQuery(
    { id: challenge?.id as string, userId: session?.data?.user?.id as string },
    { skip: !challenge?.id || mode === "admin" || !session?.data?.user?.id }
  );
  const [deleteChallenge, { isLoading: isDeleting }] = useDeleteChallengeMutation();
  const challengeUrl = useGetChallengeUrl(slug);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this challenge? This action cannot be undone.");

    if (!isConfirmed) return;

    try {
      await deleteChallenge(challenge?.id as string);
      toast.success("Challenge deleted successfully");
      router.push('/dashboard/admin/challenges-hackathons');
    } catch (error) {
      toast.error("Failed to delete challenge");
      console.error('Failed to delete challenge:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-[1fr,400px] gap-4">
        {/* Main Content Card Loading State */}
        <Card className="h-fit">
          <CardHeader>
            <Skeleton className="h-56 w-full" />
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Instructions Card Loading State */}
        <div className="space-y-4">
          <Card className="h-fit">
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <div className="space-y-3">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-3 pt-2">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
              {mode === "admin" ? (
                <div className="flex gap-2 w-full">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
          {mode === "admin" && (
            <Card className="h-fit">
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-3 pt-2">
                    <Skeleton className="size-11 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="grid lg:grid-cols-[1fr,400px] gap-4">
      {/* Main Content Card */}
      <Card className="h-fit">
        <CardHeader>
          <div className="relative bg-[#3B82F6] flex items-center justify-center h-56 p-6 rounded-lg">
            <Image
              src={"/umurava-logo.webp"}
              alt={`${challenge.title} Logo`}
              width={150}
              height={40}
            />
          </div>
        </CardHeader>
        <CardContent className="px-6 space-y-4">
          {/* Project Title */}
          <h1 className="text-xl font-semibold text-[#101928]">
            Project Brief: {challenge.title}
          </h1>

          {/* Project Description */}
          <p className="text-muted-foreground">
            {challenge.description}
          </p>

          {/* Tasks Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#101928]">
              Tasks:
            </h2>
            <div dangerouslySetInnerHTML={{ __html: challenge.projectBrief }} />
            <div dangerouslySetInnerHTML={{ __html: challenge.projectDescription }} />
            <h2 className="text-xl font-semibold text-[#101928]">
              Project Requirements
            </h2>
            <div dangerouslySetInnerHTML={{ __html: challenge.projectRequirements }} />
            <h2 className="text-xl font-semibold text-[#101928]">
              Deliverables
            </h2>
            <div dangerouslySetInnerHTML={{ __html: challenge.deliverables }} />
          </div>
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <div className="space-y-4">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Key Instructions:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">You are free to schedule the clarification call with the team via this</p>

            {/* Info Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 pt-2 rounded-lg">
                <div className="size-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-[#25272B]">{challenge.contactEmail}</div>
                  <div className="text-sm text-muted-foreground">Contact Email</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 rounded-lg">
                <div className="size-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <BriefCase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-[#25272B]">{/*{challenge.category}*/} Todo</div>
                  <div className="text-sm text-muted-foreground">Challenge Category</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 rounded-lg">
                <div className="size-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-[#25272B]">{challenge.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 rounded-lg">
                <div className="size-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <Money className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-[#25272B]">{challenge.prize}</div>
                  <div className="text-sm text-muted-foreground">Money Prize</div>
                </div>
              </div>
            </div>
            {!isLoadingSubmission && (
              <>
                {mode == "admin" ? (
                  <div className="flex gap-2 w-full">
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => router.push(`${challengeUrl}/edit`)}
                      disabled={isDeleting}
                    >
                      Edit
                    </Button>
                  </div>
                ) : existingSubmission ? (
                  <SubmissionView challengeSlug={challenge.slug} participantId={session?.data?.user?.id || ""} mode="talent">
                    <Button className="w-full h-12" size="lg" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Submission
                    </Button>
                  </SubmissionView>
                ) : (
                  <SubmitWork challengeId={challenge.id}>
                    <Button className="w-full h-12" size="lg">
                      Submit your work
                    </Button>
                  </SubmitWork>
                )}
              </>
            )}
          </CardContent>
        </Card>
        {mode == "admin" && (
          <ChallengeParticipants challengeId={challenge.id} slug={challenge.slug} />
        )}
      </div>
    </div>
  )
}


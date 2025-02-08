"use client"
import { useGetChallengeQuery, useUpdateChallengeMutation } from "@/lib/redux/features/challengeApi"
import { Challenge } from "@/types/challenge"
import ChallengeForm from "./challenge-form"
import { useRouter } from "next/navigation"

export default function EditChallenge({ slug }: { slug: string }) {
  const { data: challenge, isLoading: isLoadingChallenge } = useGetChallengeQuery({id: slug, type: 'slug'})
  const [updateChallenge, { isLoading: isUpdating }] = useUpdateChallengeMutation()
  const router = useRouter()

  const handleSubmit = async (data: Partial<Challenge>) => {
    try {
      if (!challenge) return
      await updateChallenge({ id: challenge.id, ...data }).unwrap()
      router.push("/dashboard/admin/challenges-hackathons")
    } catch (error) {
      console.error("Failed to update challenge:", error)
    }
  }

  return (
    <ChallengeForm
      initialData={challenge}
      onSubmit={handleSubmit}
      isLoading={isLoadingChallenge}
      isSubmitting={isUpdating}
      mode="edit"
    />
  )
} 
"use client"

import { useCreateChallengeMutation } from "@/lib/redux/features/challengeApi"
import ChallengeForm from "./challenge-form"
import { useRouter } from "next/navigation"

export default function CreateChallenge() {
  const [createChallenge, { isLoading }] = useCreateChallengeMutation()
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      await createChallenge(data).unwrap()
      router.push("/dashboard/admin/challenges-hackathons")
    } catch (error) {
      console.error("Failed to create challenge:", error)
      throw error
    }
  }

  return (
      <ChallengeForm 
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        mode="create"
      />
  )
}
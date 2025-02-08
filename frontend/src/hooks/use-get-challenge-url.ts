import { useMode } from "@/hooks/use-mode";

export const useGetChallengeUrl = (slug: string) => {
  const mode = useMode()
  return mode === 'admin'
    ? `/dashboard/admin/challenges-hackathons/${slug}`
    : `/dashboard/challenges-hackathons/${slug}`
}
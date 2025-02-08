import Filters from "@/components/filters";
import Heading from "@/components/heading";
import { ChallengeListWithPagination } from "@/components/challenge/challenge-list-with-pagination";

export const dynamic = 'force-dynamic'

export default function Challenges() {
  return (
    <div className="space-y-6 p-6 w-full">
      <Heading title="Challenges" subtitle="Join a challenge or a hackathon to gain valuable work experience,"/>
      <Filters />
      <ChallengeListWithPagination initialParams={{ sortBy: "createdAt", sortOrder: "desc" }} />
    </div>
  )
}

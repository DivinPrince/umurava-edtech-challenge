import Filters from "@/components/filters";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/heading";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ChallengeListWithPagination } from "@/components/challenge/challenge-list-with-pagination";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

export default function Challenges() {
  return (
    <div className="space-y-6 p-6 w-full">
      <Heading title="Challenges" subtitle="Join a challenge or a hackathon to gain valuable work experience," />
      <div className="flex justify-between items-center gap-6">
        <Filters />
        <Link href="/dashboard/admin/challenges-hackathons/create" className={buttonVariants({ size: "lg", className: "h-12" })}>
          <Plus className="size-6" />
          Create New Challange
        </Link>
      </div>
      <Suspense>
        <ChallengeListWithPagination initialParams={{ sortBy: "createdAt", sortOrder: "desc" }} />
      </Suspense>
    </div>
  )
}

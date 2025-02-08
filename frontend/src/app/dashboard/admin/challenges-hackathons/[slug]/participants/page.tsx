import ChallengeHeader from "@/components/challenge/challenge-header"
import { ChallengeParticipantsWithPagination } from "@/components/challenge/challenge-participants-with-pagination"

export default async function ParticipantsPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <>
            <ChallengeHeader
                slug={slug} 
                title="Challenge Participants" 
            />
            <div className="container mx-auto p-6 py-8">
                <ChallengeParticipantsWithPagination slug={slug} />
            </div>
        </>
    )
}
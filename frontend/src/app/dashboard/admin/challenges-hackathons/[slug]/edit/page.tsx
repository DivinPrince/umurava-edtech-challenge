import ChallengeHeader from "@/components/challenge/challenge-header";
import EditChallenge from "@/components/challenge/edit-challenge";

export default async function EditChallengePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <>
            <ChallengeHeader slug={slug} title={slug == "create" ? "Create New Challenge" : slug} />
            <div className="p-6 container mx-auto py-8">
                <div className="mx-auto max-w-2xl">
                    <EditChallenge slug={slug} />
                </div>
            </div>
        </>
    );
}

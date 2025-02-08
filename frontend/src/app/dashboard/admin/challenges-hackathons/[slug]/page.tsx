import ChallengeBrief from "@/components/challenge/challenge-brief";
import ChallengeHeader from "@/components/challenge/challenge-header";
import CreateChallenge from "@/components/challenge/create-challenge";

export default async function ChallengePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <>
            <ChallengeHeader slug={slug} title={slug == "create" ? "Create New Challenge" : slug} />
            <div className="p-6">
                {slug == "create" ? (
                    <div className="mx-auto max-w-2xl">
                        <CreateChallenge />
                    </div>
                    ) : <ChallengeBrief slug={slug} />}
            </div>
        </>
    );
}

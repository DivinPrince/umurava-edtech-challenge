import ChallengeBrief from "@/components/challenge/challenge-brief";
import ChallengeHeader from "@/components/challenge/challenge-header";

export default async function ChallengePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <>
            <ChallengeHeader slug={slug} title={slug} />
            <div className="p-6">
                <ChallengeBrief slug={slug} />
            </div>
        </>
    );
}

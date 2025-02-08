import { ChallengeListWithPagination } from "@/components/challenge/challenge-list-with-pagination";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ChallengePage() {
    return (
        <main className="min-h-screen bg-grayed">
            <div className="py-12 space-y-12">
                <div
                    className="mx-auto px-12 flex items-center gap-3 text-sm font-medium text-gray-900"
                >
                    <Link href="/" className="p-1 border rounded-md bg-card">
                        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                    </Link>
                    <p className="text-gray-400 font-semibold">Go Back / <span className="text-primary">Challenges & Hackathons</span></p>
                </div>
                <div className="container mx-auto px-4">
                    <section>
                        <Suspense>
                            <ChallengeListWithPagination
                                paginationType="more"
                                hideLoader
                            />
                        </Suspense>
                    </section>
                </div>
            </div>
        </main>
    );
}

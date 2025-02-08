"use client"

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { ChallengeSearch } from "@/components/challenge-search";
import { useMode } from "@/hooks/use-mode";
import { useSession } from "@/lib/auth";
import User from "@/components/avatar";
import { Skeleton } from "../ui/skeleton";
import { Suspense } from "react";

export default function Header() {
    const mode = useMode()
    const { data: session, isPending } = useSession()
    return (
        <header className="flex-1 w-full bg-card sticky top-0 px-6 z-[1] border-b border-border">
            <div className="flex gap-2 h-16 items-center justify-between">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <Suspense>
                    <ChallengeSearch
                        path={mode == "admin" ? "/dashboard/admin/challenges-hackathons" : undefined}
                    />
                </Suspense>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="icon" className="size-10 rounded-full [&_svg]:size-5" aria-label="Notifications">
                        <Bell className="text-muted-foreground" />
                    </Button>
                    {isPending ? (
                        <Skeleton className="size-8 rounded-full" />
                    ) : (
                        <User
                            image={session?.user?.image || ""}
                            alt={session?.user?.name}
                            fallback={session?.user?.name?.charAt(0)}
                            className="bg-primary"
                        />
                    )}
                </div>
            </div>
        </header>
    )
}


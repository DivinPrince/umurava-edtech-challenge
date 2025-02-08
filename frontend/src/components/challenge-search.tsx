"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const ChallengeSearch = ({ path = "/dashboard/challenges-hackathons" }: { path?: string }) => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const { push } = useRouter();

    const handleSearch = useDebouncedCallback((query: string) => {
        push(`${path}?q=${query}`);
    }, 500);

    return (
        <div className="flex w-full max-w-sm items-center">
            <div className="relative w-full">
                <Input
                    onChange={e => handleSearch(e.target.value)}
                    defaultValue={query?.toString()}
                    type="search"
                    placeholder="Search here..."
                    className="h-10 w-full bg-secondary/60 shadow-sm pl-9 border-none peer"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Search size={16} strokeWidth={2} aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

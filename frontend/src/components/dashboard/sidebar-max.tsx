"use client"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarMax({ children }: { children: React.ReactNode }) {
    const { state, isMobile } = useSidebar()

    return (
        <div className={cn(
            "max-w-[calc(100vw)] md:group-data-[collapsible=icon]:max-w-[calc(100vw-var(--sidebar-width-icon)-0.5rem)] group-data-[collapsible=offcanvas]:max-w-[calc(100vw-0.5rem)]",
            !isMobile && state === "expanded" && "max-w-[calc(100vw-var(--sidebar-width))]"
            )}>
            {children}
        </div>
    )
}

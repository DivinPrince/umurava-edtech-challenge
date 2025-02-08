"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useDashboardRoutes } from "@/hooks/use-dashboard-routes"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserButton } from "../user-button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { openCommunityModal } from "@/lib/redux/features/communitySlice"
import { CommunityModal } from "../community-modal"

export function AppSidebar() {
    const routes = useDashboardRoutes()
    const dispatch = useAppDispatch()

    const handleItemClick = (route: { url: string; title: string }) => {
        if (route.url === "/community") {
            dispatch(openCommunityModal())
            return
        }
    }

    return (
            <Sidebar>
                <SidebarHeader>
                    <img
                        src={"/logo.png"}
                        width={60}
                        height={60}
                        alt="logo"
                    />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {routes.navMain.map((route) => (
                                <SidebarMenuItem key={route.url}>
                                    {route.url === "/community" ? (
                                        <button
                                            onClick={() => handleItemClick(route)}
                                            className={cn(
                                                "flex items-center gap-2 w-full p-2 rounded-md",
                                                route.isActive
                                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                                            )}
                                        >
                                            <route.icon className="size-5" />
                                            {route.title}
                                        </button>
                                    ) : (
                                        <Link
                                            href={route.url}
                                            className={cn(
                                                "flex items-center gap-2 w-full p-2 rounded-md",
                                                route.isActive
                                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                                            )}
                                        >
                                            <route.icon className="size-5" />
                                            {route.title}
                                        </Link>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className="mt-auto">
                        <SidebarMenu>
                            {routes.navSecondary.map((route) => (
                                <SidebarMenuItem key={route.url}>
                                    <Link
                                        href={route.url}
                                        className={cn(
                                            "flex items-center gap-2 w-full p-2 rounded-md",
                                            route.isActive
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                                        )}
                                    >
                                        <route.icon className="size-5" />
                                        {route.title}
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        <SidebarMenu>
                            <UserButton />
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            <CommunityModal />
            </Sidebar>
    )
}

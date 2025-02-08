"use client"

import {
  LogOutIcon
} from "lucide-react"

import {
  SidebarMenu, SidebarMenuItem
} from "@/components/ui/sidebar"
import User from "./avatar"
import { Button } from "./ui/button"
import { useSession, signOut } from "@/lib/auth"
import { Skeleton } from "./ui/skeleton"

export function UserButton() {
  const { data: session, isPending } = useSession()
  const handleSignOut = () => {
    signOut().then(() => {
      window.location.href = '/'
    })
  }

  if (isPending) {
    return (
      <SidebarMenu className="mt-6">
        <SidebarMenuItem className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <div className="grid flex-1 place-content-center gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="size-8" />
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu className="mt-6">
      <SidebarMenuItem className="flex items-center gap-2">
              <User
                image={session?.user?.image || ""}
                alt={session?.user?.name}
                fallback={session?.user?.name?.charAt(0)}
              />
              <div className="grid flex-1 place-content-center text-sm leading-tight">
                <span className="truncate font-semibold">{session?.user?.name}</span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
              <Button variant="native" className="ml-auto hover:bg-background/10" onClick={handleSignOut}>
                <LogOutIcon className="size-4" />
              </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

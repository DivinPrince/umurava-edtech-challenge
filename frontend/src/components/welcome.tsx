"use client"

import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Welcome({
  hideProfileButton = false
}: {
  hideProfileButton?: boolean
}) {
  const isMobile = useIsMobile()
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between w-full">
      <div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Welcome back Hilaire,</h1>
        <p className="text-sm md:text-base text-gray-600">Build Work Experience through skills challenges</p>
      </div>
      {!hideProfileButton && (
        <Button 
          variant="default"
          size="lg"
          className={cn("h-12 items-center gap-2 text-xl [&_svg]:size-6", isMobile && "h-12 [&_svg]:size-6 text-lg")}
      >
        <Eye />
          View Profile
        </Button>
      )}
    </div>
  )
}


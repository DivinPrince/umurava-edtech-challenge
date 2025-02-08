import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export interface Challenge {
  id: string
  title: string
  skills: string[]
  seniority: string
  timeline: string
  status?: 'completed' | 'ongoing' | 'open'
  url: string
  
}

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCardSkeleton() {
  return (
    <Card className="relative flex flex-col">
      <CardHeader className="p-4">
        <div className="relative bg-[#3B82F6] flex items-center justify-center h-48 p-6 rounded-lg">
          
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 px-4 pb-2">
        <Skeleton className="h-7 w-3/4" />
        <div className="space-y-2">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((idx) => (
                <Skeleton key={idx} className="h-7 w-20" />
              ))}
            </div>
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  )
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="relative flex flex-col">
      <CardHeader className="p-4">
        <div className="relative bg-[#3B82F6] flex items-center justify-center h-48 p-6 rounded-lg">
            {challenge.status && (
              <Badge 
                variant={challenge.status}
                className="absolute right-4 top-4 h-7 px-5 py-1 capitalize"
              >
                {challenge.status}
              </Badge>
            )}
          <Image
            src="/umurava-logo.webp"
            alt="Umurava Logo"
            width={150}
            height={40}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 px-4 pb-2">
        <h3 className="font-semibold text-xl text-[#101928]">{challenge.title}</h3>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-bold mb-2 text-[#25272B]">Skills Needed:</p>
            <div className="flex flex-wrap gap-2">
              {challenge.skills.map((skill, idx) => (
                <div key={idx} className="bg-card border border-primary text-primary rounded-lg px-2 py-1 h-7 text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm"><span className="font-bold text-[#171717]">Seniority Level:</span> <span className="text-muted-foreground">({challenge.seniority})</span></p>
          <p className="text-sm"><span className="font-bold text-[#171717]">Timeline:</span> <span className="text-muted-foreground">{challenge.timeline}</span></p>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link href={challenge.url}>
          <Button className="w-fit">
            View Challenge
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
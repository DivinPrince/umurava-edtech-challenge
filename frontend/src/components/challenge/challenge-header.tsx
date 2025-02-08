"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMode } from "@/hooks/use-mode";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChallengeHeader({
  title,
  slug
}: {
  title: string;
  slug?: string;
}) {
  const mode = useMode()
  const router = useRouter()

  const basePath = mode === 'admin' ? '/dashboard/admin/challenges' : '/dashboard/challenges-hackathons'
  
  return (
    <div className="bg-card z-[1] border-b py-4 px-6 text-lg sticky top-[calc(4rem+1px)]">
      <span className="sr-only">{slug}</span>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="flex items-center gap-2" asChild>
                <button className="p-1 border rounded-md" onClick={() => router.back()}>
                  <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                </button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-semibold text-[#98A2B3] hover:text-[#667185] ml-4" asChild>
              <Link href={basePath}>
                Challenges & Hackathons
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator> / </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary font-semibold">{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

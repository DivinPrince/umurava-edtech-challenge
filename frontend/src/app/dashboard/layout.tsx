import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import { SidebarMax } from "@/components/dashboard/sidebar-max"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="w-full flex flex-col min-h-[calc(100vh-4rem)] bg-secondary/50 relative">
          <SidebarMax>
            {children}
          </SidebarMax>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
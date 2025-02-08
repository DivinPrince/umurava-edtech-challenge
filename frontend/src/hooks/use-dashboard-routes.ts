import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Settings, Headset, Gift, Home } from 'lucide-react';
import { FileIcon, UserPlus } from '@/components/ui/icons';

export function useDashboardRoutes() {
  const pathname = usePathname();

  const isActive = useMemo(() => (url: string) => {
    return pathname === url;
  }, [pathname]);

  const isAdminRoute = pathname?.startsWith('/dashboard/admin');

  const data = useMemo(() => ({
    navMain: isAdminRoute ? [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: Home,
        isActive: isActive("/dashboard/admin"),
      },
      {
        title: "Challenges & Hackathons", 
        url: "/dashboard/admin/challenges-hackathons",
        icon: FileIcon,
        isActive: isActive("/dashboard/admin/challenges-hackathons"),
      },
      {
        title: "Community",
        url: "/community",
        icon: UserPlus,
        isActive: isActive("/community"),
      }
    ] : [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: isActive("/dashboard"),
      },
      {
        title: "Challenges & Hackathons", 
        url: "/dashboard/challenges-hackathons",
        icon: FileIcon,
        isActive: isActive("/dashboard/challenges-hackathons"),
      },
      {
        title: "Community",
        url: "/community",
        icon: UserPlus,
        isActive: isActive("/community"),
      }
    ],
    navSecondary: [
      {
        title: "Settings",
        url: isAdminRoute ? "/dashboard/admin/settings" : "/dashboard/settings",
        icon: Settings,
        isActive: isActive(isAdminRoute ? "/dashboard/admin/settings" : "/dashboard/settings"),
      },
      {
        title: "Help Center",
        url: "/help-center",
        icon: Headset,
        isActive: isActive("/help-center"),
      },
      {
        title: "Refer family & friends",
        url: "/refer",
        icon: Gift,
        isActive: isActive("/refer"),
      }
    ]
  }), [pathname, isActive, isAdminRoute]);

  return data;
}

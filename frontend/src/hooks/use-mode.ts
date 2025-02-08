import { usePathname } from 'next/navigation';

export function useMode() {
    const pathname = usePathname();
    return pathname?.startsWith('/dashboard/admin') ? 'admin' : 'talent';
}
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) {
            return; // Don't do anything while loading
        }

        if (!user) {
            // Redirect to login page if not authenticated, but only if not already on a public page
            const isPublicPage = ['/login', '/signup', '/role-selection', '/splash'].some(p => pathname.startsWith(p));
            if (!isPublicPage) {
                router.push('/login');
            }
        }
    }, [user, loading, pathname, router]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="grid gap-4 w-full max-w-sm">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
            </div>
        )
    }

    // If we're not loading and there's no user, and we're not on a public page,
    // we should show a loading state or null while the redirect effect runs.
    if (!user && !['/login', '/signup', '/role-selection', '/splash'].some(p => pathname.startsWith(p))) {
        return (
             <div className="flex items-center justify-center min-h-screen bg-background">
                 <div className="grid gap-4 w-full max-w-sm">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
            </div>
        )
    }


    return <>{children}</>;
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
    </AuthProvider>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/auth-context';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse">
                    {/* You can use your Logo component here if you want */}
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        // Redirect to login page if not authenticated, but only if not already on a public page
        if (!['/login', '/signup', '/role-selection', '/splash'].some(p => pathname.startsWith(p))) {
             router.push('/login');
        }
        // Return null or a loading indicator while redirecting
        return null;
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

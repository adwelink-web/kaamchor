
'use client';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This page is a placeholder to redirect to the correct profile page.
export default function ProfileRedirectPage() {
    const { user, userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (user && userRole) {
            if (userRole === 'helper') {
                router.replace('/helper/profile');
            } else {
                router.replace('/requester/profile');
            }
        } else if (!user) {
            router.replace('/login');
        }
    }, [user, userRole, loading, router]);
    
    return null; // or a loading spinner
}

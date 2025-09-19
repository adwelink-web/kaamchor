'use client';

import { Logo } from '@/components/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function SplashContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const to = searchParams.get('to') || '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(to);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [router, to]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="animate-pulse">
        <Logo className="h-24 w-24 text-primary" />
      </div>
    </div>
  );
}


export default function SplashPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-background"><Logo className="h-24 w-24 text-primary" /></div>}>
            <SplashContent />
        </Suspense>
    )
}

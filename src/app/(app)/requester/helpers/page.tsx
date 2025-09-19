'use client';

import { getHelpers } from '@/lib/data';
import HelperCard from '@/components/helpers/helper-card';
import { useEffect, useState } from 'react';
import type { Helper } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function FindHelpersPage() {
    const [helpers, setHelpers] = useState<Helper[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHelpers().then(allHelpers => {
            setHelpers(allHelpers);
            setLoading(false);
        });
    }, []);

    if (loading) {
         return (
            <div className="grid flex-1 items-start gap-4">
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">Find Helpers</h1>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-72 w-full" />)}
                </div>
            </div>
        )
    }

    return (
        <div className="grid flex-1 items-start gap-4">
        <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Find Helpers</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {helpers.map((helper) => (
            <HelperCard key={helper.id} helper={helper} />
            ))}
        </div>
        </div>
    );
}

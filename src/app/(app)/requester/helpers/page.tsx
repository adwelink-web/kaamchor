
import { getHelpers } from '@/lib/data';
import HelperCard from '@/components/helpers/helper-card';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function HelperList() {
  const helpers = await getHelpers();

  if (helpers.length === 0) {
    return (
       <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card col-span-full">
          <p className="font-semibold">No helpers available right now.</p>
          <p className="text-sm">Please check back later.</p>
        </div>
    )
  }

  return (
    <>
      {helpers.map((helper) => (
          <HelperCard key={helper.id} helper={helper} />
        ))}
    </>
  )
}

function HelperListSkeleton() {
    return (
        <>
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-72 w-full" />)}
        </>
    )
}

export default function FindHelpersPage() {
  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Find Helpers</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Suspense fallback={<HelperListSkeleton />}>
          <HelperList />
        </Suspense>
      </div>
    </div>
  );
}

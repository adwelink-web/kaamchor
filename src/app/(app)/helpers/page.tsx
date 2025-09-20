import { getHelpers } from '@/lib/data';
import HelperCard from '@/components/helpers/helper-card';

export default async function FindHelpersPage() {
  const helpers = await getHelpers();

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Find Helpers</h1>
      </div>
      {helpers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {helpers.map((helper) => (
            <HelperCard key={helper.id} helper={helper} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
          <p className="font-semibold">No helpers available right now.</p>
          <p className="text-sm">Please check back later.</p>
        </div>
      )}
    </div>
  );
}

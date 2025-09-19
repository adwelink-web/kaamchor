import { mockHelpers } from '@/lib/data';
import HelperCard from '@/components/helpers/helper-card';

export default function FindHelpersPage() {
  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Find Helpers</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockHelpers.map((helper) => (
          <HelperCard key={helper.id} helper={helper} />
        ))}
      </div>
    </div>
  );
}

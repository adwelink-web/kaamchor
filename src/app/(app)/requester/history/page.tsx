
import MyTasksClient from '@/components/tasks/my-tasks-client';
import { getTasksByRequester } from '@/lib/data';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function HistoryData() {
    const user = auth.currentUser;
    if (!user) {
        redirect('/login');
    }
    const userTasks = await getTasksByRequester(user.uid);
    const completedTasks = userTasks.filter(task => task.status === 'Completed');

    return <MyTasksClient tasks={completedTasks} />;
}

function HistorySkeleton() {
    return <Skeleton className="h-48 w-full" />;
}

export default function TaskHistoryPage() {
    return (
        <div className="grid flex-1 items-start gap-4">
        <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">My Task History</h1>
        </div>
        <Suspense fallback={<HistorySkeleton />}>
            <HistoryData />
        </Suspense>
        </div>
    );
}

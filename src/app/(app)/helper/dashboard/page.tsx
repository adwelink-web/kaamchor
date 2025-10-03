
import { getTasks } from '@/lib/data';
import TaskCard from '@/components/tasks/task-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

async function TaskList() {
  const allTasks = await getTasks();
  const availableTasks = allTasks.filter(task => task.status === 'Posted');

  if (availableTasks.length === 0) {
    return (
        <div className="text-center py-12 text-muted-foreground col-span-full">
            No tasks available right now.
        </div>
    );
  }

  return (
    <>
      {availableTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
}

function TaskListSkeleton() {
    return (
        <>
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </>
    )
}

export default function HelperDashboardPage() {
    return (
        <div className="flex flex-col flex-1 gap-4">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Find Work</h1>
                <p className="text-muted-foreground ml-4 hidden sm:block">Browse available tasks in your area.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Suspense fallback={<TaskListSkeleton />}>
                    <TaskList />
                </Suspense>
            </div>
        </div>
    );
}

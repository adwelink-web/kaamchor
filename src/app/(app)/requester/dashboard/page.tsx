'use client';

import MyTasksClient from '@/components/tasks/my-tasks-client';
import { getTasksByRequester } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import type { Task } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyTasksPage() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getTasksByRequester(user.uid).then((userTasks) => {
        const activeTasks = userTasks.filter(task => task.status !== 'Completed');
        setTasks(activeTasks);
        setLoading(false);
      });
    } else if (!authLoading) {
        setLoading(false);
    }
  }, [user, authLoading]);

  if (loading || authLoading) {
      return (
          <div className="grid flex-1 items-start gap-4">
               <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">My Active Tasks</h1>
                </div>
                <Skeleton className="h-48 w-full" />
          </div>
      )
  }

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">My Active Tasks</h1>
      </div>
      <MyTasksClient tasks={tasks} />
    </div>
  );
}

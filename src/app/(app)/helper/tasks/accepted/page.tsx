
'use client';

import AcceptedTasksClient from '@/components/tasks/accepted-tasks-client';
import { onTasksForHelperUpdate } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import type { Task } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AcceptedTasksPage() {
  const { user, dbUser, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dbUser) {
      const unsubscribe = onTasksForHelperUpdate(dbUser.id, (helperTasks) => {
        setTasks(helperTasks);
        setLoading(false);
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [dbUser, authLoading]);

  if (loading || authLoading) {
      return (
           <div className="grid flex-1 items-start gap-4">
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">My Accepted Tasks</h1>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
           </div>
      )
  }

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">My Accepted Tasks</h1>
      </div>
      <AcceptedTasksClient tasks={tasks} />
    </div>
  );
}

'use client';

import AcceptedTasksClient from '@/components/tasks/accepted-tasks-client';
import { getTasks } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import type { Task } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AcceptedTasksPage() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // This is a temporary way to link a Firebase user to a helper profile.
  // In a real app, this would be stored in the user's profile in Firestore.
  const helperId = 'helper-1'; 

  useEffect(() => {
    if (user) {
        // In a real app, you'd fetch tasks where helperId matches the current user's helper profile ID.
        getTasks().then(allTasks => {
            const accepted = allTasks.filter((task) => task.helperId === helperId && task.status !== 'Completed');
            setTasks(accepted);
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


'use client';

import { getTasks } from '@/lib/data';
import TaskCard from '@/components/tasks/task-card';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import type { Task } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function HelperDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTasks().then(allTasks => {
            const availableTasks = allTasks.filter(task => task.status === 'Posted');
            setTasks(availableTasks);
            setLoading(false);
        });
    }, []);

    if (loading || authLoading) {
        return (
            <div className="flex flex-col flex-1 gap-4">
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">Find Work</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col flex-1 gap-4">
        <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Find Work</h1>
            <p className="text-muted-foreground ml-4 hidden sm:block">Browse available tasks in your area.</p>
        </div>
        
        {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
                ))}
            </div>
        ) : (
            <div className="text-center py-12 text-muted-foreground">
                No tasks available right now.
            </div>
        )}
        </div>
    );
}

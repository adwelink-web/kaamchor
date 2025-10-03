'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { updateTaskStatus } from '@/app/actions';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TaskDetailsClient({ task: initialTask }: { task: Task}) {
  const [task, setTask] = useState(initialTask);
  const [isAccepting, setIsAccepting] = useState(false);
  const { toast } = useToast();
  const { dbUser } = useAuth();
  
  const helperId = dbUser?.id; 

  const handleAccept = async () => {
    if (!task || !helperId) return;

    setIsAccepting(true);
    try {
      await updateTaskStatus(task.id, 'Accepted', helperId);
      setTask({ ...task, status: 'Accepted', helperId: helperId });
      toast({
        title: 'Task Accepted!',
        description: `You have accepted the task: "${task.title}". The requester has been notified.`,
      });
    } catch (error) {
       toast({
        title: 'Error',
        description: 'Could not accept the task. Please try again.',
        variant: 'destructive',
      });
    } finally {
        setIsAccepting(false);
    }
  };

  return (
    <CardFooter>
      {task.status === 'Posted' && dbUser?.role === 'helper' && (
        <Button size="lg" className="w-full sm:w-auto" onClick={handleAccept} disabled={isAccepting}>
            {isAccepting ? 'Accepting...' : 'Accept Task'}
        </Button>
      )}
      {(task.status === 'Accepted' || task.status === 'In Progress') && (
        <Button size="lg" disabled className="w-full sm:w-auto">Task Already Accepted</Button>
      )}
      {task.status === 'Completed' && (
        <Button size="lg" disabled className="w-full sm:w-auto">Task is Completed</Button>
      )}
    </CardFooter>
  )

}

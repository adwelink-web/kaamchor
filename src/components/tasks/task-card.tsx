'use client';

import type { Task } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { updateTaskStatus } from '@/app/actions';
import { useAuth } from '@/contexts/auth-context';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task: initialTask }: TaskCardProps) {
  const [task, setTask] = useState(initialTask);
  const [isAccepting, setIsAccepting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth(); // Assuming this provides the current helper's info.

  const handleAccept = async () => {
    // In a real app, the helper's ID would come from their user profile.
    // We are using a hardcoded ID for now as we don't have helper profiles.
    const helperId = 'helper-1';

    if (!helperId) {
       toast({
        title: 'Error',
        description: 'You must be logged in as a helper to accept a task.',
        variant: 'destructive',
      });
      return;
    }

    setIsAccepting(true);

    try {
      // Set the task as accepted and assign the helper
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

  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'Accepted':
        return 'secondary';
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'warning';
      case 'Posted':
      default:
        return 'outline';
    }
  };

  const isAcceptable = task.status === 'Posted';

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">{task.title}</CardTitle>
          <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
        </div>
        <CardDescription className="line-clamp-2 pt-1">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4" />
            <span>₹{task.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{task.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full" variant="outline" asChild>
          <Link href={`/tasks/${task.id}`}>View Details</Link>
        </Button>
        <Button className="w-full" disabled={!isAcceptable || isAccepting} onClick={handleAccept}>
          {isAccepting ? 'Accepting...' : task.status === 'Posted' ? 'Accept Task' : 'Accepted'}
        </Button>
      </CardFooter>
    </Card>
  );
}

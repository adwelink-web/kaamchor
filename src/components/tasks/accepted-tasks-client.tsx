'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '../ui/badge';
import { MapPin, CircleDollarSign, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { updateTaskStatus } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type AcceptedTasksClientProps = {
  tasks: Task[];
};

export default function AcceptedTasksClient({ tasks: initialTasks }: AcceptedTasksClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    // Optimistically update the UI
    const originalTasks = tasks;
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
        // Call the server action
        await updateTaskStatus(taskId, newStatus);
        toast({
            title: "Status Updated!",
            description: `Task status has been changed to "${newStatus}".`
        })
    } catch (error) {
        // Revert the optimistic update on error
        setTasks(originalTasks);
        toast({
            title: "Error",
            description: "Failed to update status. Please try again.",
            variant: "destructive"
        })
    }
  };

  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'Accepted':
        return 'secondary';
      case 'In Progress':
        return 'warning';
      case 'Completed':
        return 'default';
      default:
        return 'outline';
    }
  };

  if (tasks.length === 0) {
    return (
        <div className="text-center py-12 text-muted-foreground border bg-card rounded-lg">
            You haven't accepted any tasks yet.
        </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {tasks.map(task => (
        <Card key={task.id}>
          {task.imageUrl && (
             <div className="aspect-video relative w-full">
                <Image src={task.imageUrl} alt={task.title} fill className="object-cover rounded-t-lg"/>
             </div>
          )}
          <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle>{task.title}</CardTitle>
                <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
            </div>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{task.location}</span>
            </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CircleDollarSign className="w-4 h-4" />
                <span>₹{task.price}</span>
            </div>
             <div>
                <p className="text-sm font-medium mb-2">Update Status</p>
                <Select
                    value={task.status}
                    onValueChange={(newStatus: Task['status']) => handleStatusChange(task.id, newStatus)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
             </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2"/>
                Contact Requester
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

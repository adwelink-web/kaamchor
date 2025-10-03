'use client';

import { useState, useEffect } from 'react';
import type { Task, User } from '@/lib/types';
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
import { MapPin, CircleDollarSign, MessageSquare, Mail, Phone, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { updateTaskStatus } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { getUser } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

type AcceptedTasksClientProps = {
  tasks: Task[];
};

function RequesterInfo({ requesterId }: { requesterId: string }) {
    const [requester, setRequester] = useState<User | null>(null);

    useEffect(() => {
        if (requesterId) {
            getUser(requesterId).then(setRequester);
        }
    }, [requesterId]);
    
    if (!requester) {
        return (
            <div className="grid gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
            </div>
        )
    }
    
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="grid gap-3">
             <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={requester.avatarUrl || undefined} alt={requester.name}/>
                    <AvatarFallback>{getInitials(requester.name)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{requester.name}</p>
                    <p className="text-xs text-muted-foreground">{requester.location}</p>
                </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
                {requester.email && (
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${requester.email}`} className="hover:underline">{requester.email}</a>
                    </div>
                )}
                {/* We are assuming phone number is on the task object for now */}
            </div>
        </div>
    )
}


export default function AcceptedTasksClient({ tasks: initialTasks }: AcceptedTasksClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();
  
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);


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
        <Card key={task.id} className="flex flex-col">
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
          <CardContent className="grid gap-4 flex-grow">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{task.location}</span>
            </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CircleDollarSign className="w-4 h-4" />
                <span>₹{task.price}</span>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium mb-3">Requester Details</p>
              <RequesterInfo requesterId={task.requesterId} />
               {task.requesterPhone && (
                    <div className="flex items-center gap-2 text-sm mt-3 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${task.requesterPhone}`} className="hover:underline">{task.requesterPhone}</a>
                    </div>
                )}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-2 flex-col items-start gap-4">
             <div>
                <p className="text-sm font-medium mb-2 px-2">Update Status</p>
                <div className="px-2 w-full">
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
             </div>
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


'use client';

import { getTask, getUser, getHelper } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, MapPin, CalendarDays, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { TASK_CATEGORIES } from '@/lib/constants';
import type { Task, User, Helper } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, use } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { updateTaskStatus } from '@/app/actions';

export default function TaskDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const [task, setTask] = useState<Task | null | undefined>(undefined);
  const [requester, setRequester] = useState<User | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const { toast } = useToast();
  
  // This is a temporary way to link a Firebase user to a helper profile.
  // In a real app, this would be stored in the user's profile in Firestore.
  const helperId = 'helper-1'; 

  useEffect(() => {
    getTask(params.id).then(fetchedTask => {
      setTask(fetchedTask);
      if (fetchedTask?.requesterId) {
        getUser(fetchedTask.requesterId).then(setRequester);
      }
    });
  }, [params.id]);

  if (task === undefined) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-0">
        <Skeleton className="h-8 w-48 mb-4" />
        <Card>
          <Skeleton className="aspect-video w-full rounded-t-lg" />
          <CardHeader>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/4 mt-2" />
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div>
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="w-full">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (task === null) {
    notFound();
  }


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
  
  const category = TASK_CATEGORIES.find(c => c.value === task.category);

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-0">
        <Link href="/helper/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Find Work
        </Link>
        <Card>
            {task.imageUrl && (
                <div className="aspect-video relative w-full">
                    <Image src={task.imageUrl} alt={task.title} fill className="object-cover rounded-t-lg"/>
                </div>
            )}
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <CardTitle className="text-2xl md:text-3xl font-bold">{task.title}</CardTitle>
                    <Badge variant={getStatusVariant(task.status)} className="text-base h-fit w-fit">{task.status}</Badge>
                </div>
                 {category && (
                    <div className="flex items-center gap-2 text-muted-foreground pt-2">
                        <category.icon className="w-4 h-4"/>
                        <span className="font-medium">{category.label}</span>
                    </div>
                )}
            </CardHeader>
            <CardContent className="grid gap-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-muted-foreground">{task.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground p-3 bg-muted/50 rounded-lg">
                        <CircleDollarSign className="w-5 h-5 text-primary"/>
                        <div>
                            <p className="text-xs">Price</p>
                            <p className="font-bold text-lg text-foreground">₹{task.price}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground p-3 bg-muted/50 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary"/>
                        <div>
                            <p className="text-xs">Location</p>
                            <p className="font-semibold text-base text-foreground">{task.location}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground p-3 bg-muted/50 rounded-lg">
                        <CalendarDays className="w-5 h-5 text-primary"/>
                        <div>
                            <p className="text-xs">Date Posted</p>
                            <p className="font-semibold text-base text-foreground">{task.createdAt.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {requester && (
                     <div>
                        <h3 className="font-semibold text-lg mb-3">Posted By</h3>
                        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={requester.avatarUrl || undefined} alt={requester.name}/>
                                <AvatarFallback>{getInitials(requester.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-foreground">{requester.name}</p>
                                <p className="text-sm text-muted-foreground">{requester.location}</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 {task.status === 'Posted' && (
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
        </Card>
    </div>
  );
}

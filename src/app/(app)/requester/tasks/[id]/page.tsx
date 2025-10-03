
'use client';

import { getTask, getHelper } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, MapPin, CalendarDays, ArrowLeft, Star, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { TASK_CATEGORIES } from '@/lib/constants';
import type { Task, Helper } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import MyTasksClient from '@/components/tasks/my-tasks-client';


function HelperInfo({ helperId }: { helperId: string }) {
    const [helper, setHelper] = useState<Helper | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        getHelper(helperId).then(setHelper);
    }, [helperId])

    const handleContact = () => {
        if (!helper) return;
        toast({
            title: "Contacting Helper...",
            description: `A notification has been sent to ${helper.name}.`,
        });
    }

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

    if (!helper) {
        return (
             <div>
                <h3 className="font-semibold text-lg mb-3">Assigned Helper</h3>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="grid gap-2 w-full">
                           <Skeleton className="h-6 w-1/2" />
                           <Skeleton className="h-4 w-3/4" />
                        </div>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <h3 className="font-semibold text-lg mb-3">Assigned Helper</h3>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="w-16 h-16 border">
                        <AvatarImage src={helper.avatarUrl} alt={helper.name} />
                        <AvatarFallback>{getInitials(helper.name)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <CardTitle>{helper.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                             <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-primary fill-primary"/> {helper.rating}
                            </div>
                            &middot;
                            <span>{helper.location}</span>
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-wrap gap-2">
                        {helper.skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleContact}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Helper
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}


export default function RequesterTaskDetailsPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
        getTask(params.id).then(fetchedTask => {
            setTask(fetchedTask === undefined ? null : fetchedTask);
        });
    }
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
                  </CardContent>
              </Card>
        </div>
    )
  }
  
  if (task === null) {
    notFound();
  }
  
  const handleMarkComplete = () => {
      if (!task) return;
      toast({
        title: "Task Marked Complete!",
        description: `Payment of ₹${task.price} will be released to the helper.`,
      })
  }
  
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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-0">
        <Link href="/requester/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to My Tasks
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

                <Separator />
                
                {task.helperId ? (
                    <HelperInfo helperId={task.helperId} />
                 ) : (
                    <div className="text-center py-8">
                       <MyTasksClient tasks={[task]} isDialog={true} />
                    </div>
                 )}

            </CardContent>
            {task.status === 'In Progress' && (
                <CardFooter>
                     <Button size="lg" className="w-full sm:w-auto" onClick={handleMarkComplete}>Mark as Complete</Button>
                </CardFooter>
            )}
        </Card>
    </div>
  );
}

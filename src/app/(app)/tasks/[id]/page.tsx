import { mockTasks, mockUsers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, MapPin, CalendarDays, User, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { TASK_CATEGORIES } from '@/lib/constants';
import type { Task } from '@/lib/types';

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
  const task = mockTasks.find((t) => t.id === params.id);

  if (!task) {
    notFound();
  }
  
  const requester = mockUsers.find(u => u.id === task.requesterId);
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
      .join('');
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
                            <p className="font-bold text-lg text-foreground">${task.price}</p>
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
                                <AvatarImage src={requester.avatarUrl} alt={requester.name}/>
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
                    <Button size="lg" className="w-full sm:w-auto">Accept Task</Button>
                )}
                 {(task.status === 'Accepted' || task.status === 'In Progress') && (
                    <Button size="lg" disabled className="w-full sm:w-auto">Task Already Accepted</Button>
                )}
                 {task.status === 'Completed' && (
                    <Button size="lg" disabled className="w-full sm:w-auto">Task Completed</Button>
                )}
            </CardFooter>
        </Card>
    </div>
  );
}

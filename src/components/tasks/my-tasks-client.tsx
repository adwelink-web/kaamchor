'use client';

import { useState, useEffect } from 'react';
import type { Task, Helper } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { WandSparkles, Bot, Eye, MessageSquare, CircleDollarSign, CalendarDays, Star, ClipboardList, Trash2 } from 'lucide-react';
import { getHelpers, getHelper } from '@/lib/data';
import { getSuggestedMatches, deleteTask } from '@/app/actions';
import type { SuggestTaskMatchesOutput } from '@/ai/flows/suggest-task-matches';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

type MyTasksClientProps = {
  tasks: Task[];
  isDialog?: boolean;
};

type MatcherDialogProps = {
  task: Task;
};

function MatcherDialog({ task }: MatcherDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestTaskMatchesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const { user } = useAuth();

  const handleFindMatches = async () => {
    setIsOpen(true);
    setLoading(true);
    setError(null);
    setSuggestions(null);

    // In a real app, requester location would come from the user's profile in Firestore.
    const requesterLocation = "Mumbai, MH";

    const availableHelpers = await getHelpers();
    setHelpers(availableHelpers);

    const taskDetails = `Category: ${task.category}, Description: ${task.description}, Price: ₹${task.price}`;

    const result = await getSuggestedMatches({
      taskDetails,
      requesterLocation: requesterLocation,
      availableHelpers: availableHelpers.map(h => ({
        helperId: h.id,
        helperLocation: h.location,
        pastWork: h.pastWork
      })),
    });

    if (result.success && result.data) {
      setSuggestions(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setLoading(false);
  };
  
  const getHelperById = (id: string): Helper | undefined => {
      return helpers.find(h => h.id === id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={handleFindMatches} className="w-full md:w-auto">
          <WandSparkles className="mr-2 h-4 w-4" />
          Find AI Matches
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Helper Suggestions</DialogTitle>
          <DialogDescription>
            Our AI has found the best helpers for your task.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {loading && (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {suggestions && (
            <div className="space-y-4">
              {suggestions.suggestedMatches.map((match) => {
                  const helper = getHelperById(match.helperId);
                  if (!helper) return null;

                  return (
                    <div key={match.helperId} className="flex items-start gap-4 p-3 bg-card rounded-lg">
                      <Image src={helper.avatarUrl} alt={helper.name} width={48} height={48} className="rounded-full"/>
                      <div className="flex-1">
                        <p className="font-semibold">{helper.name}</p>
                        <p className="text-sm text-muted-foreground">{helper.location}</p>
                        <div className="mt-2 text-xs p-2 bg-muted/50 rounded-md flex gap-2 items-start">
                          <Bot className="w-4 h-4 mt-0.5 shrink-0 text-primary"/> 
                          <span>{match.reason}</span>
                        </div>
                         <Button size="sm" className="mt-2">Invite Helper</Button>
                      </div>
                    </div>
                  );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function HelperInfo({ helperId }: { helperId: string }) {
    const [helper, setHelper] = useState<Helper | null>(null);

    useEffect(() => {
        if(helperId) {
            getHelper(helperId).then(setHelper)
        }
    }, [helperId])

    if (!helperId) return <span className="text-muted-foreground">-</span>;
    if (!helper) return <Skeleton className="h-5 w-24" />;
    
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src={helper.avatarUrl} alt={helper.name} />
                <AvatarFallback>{getInitials(helper.name)}</AvatarFallback>
            </Avatar>
            <span className="truncate">{helper.name}</span>
        </div>
    )
}

function TaskActions({ task, isDialog }: { task: Task, isDialog?: boolean }) {
    const commonButtonClass = "w-full md:w-auto";

    const viewDetailsButton = (
        <Button asChild size="sm" variant="outline" className={commonButtonClass}>
            <Link href={`/requester/tasks/${task.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
            </Link>
        </Button>
    );

    if (isDialog) {
        return <MatcherDialog task={task} />
    }

    switch(task.status) {
        case 'Posted':
            return (
                <div className="flex flex-col md:flex-row gap-2">
                    {viewDetailsButton}
                    <MatcherDialog task={task} />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive" className={commonButtonClass}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                task and remove it from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteTask(task.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        case 'Accepted':
        case 'In Progress':
             return (
                <div className="flex flex-col md:flex-row gap-2">
                    {viewDetailsButton}
                    <Button size="sm" variant="outline" className={commonButtonClass}>
                        <MessageSquare className="mr-2 h-4 w-4"/>
                        Contact Helper
                    </Button>
                </div>
             );
        case 'Completed':
            return (
                <div className="flex flex-col md:flex-row gap-2">
                    {viewDetailsButton}
                    <Button size="sm" className={commonButtonClass}>
                        <Star className="mr-2 h-4 w-4"/>
                        Rate Helper
                    </Button>
                </div>
            );
        default:
            return viewDetailsButton;
    }
}


export default function MyTasksClient({ tasks, isDialog = false }: MyTasksClientProps) {
  const isMobile = useIsMobile();

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

  if (isDialog) {
      return (
          <div className="text-center py-8">
              <h3 className="font-semibold text-lg mb-2">No Helper Assigned</h3>
              <p className="text-muted-foreground">This task is still open. We'll notify you when a helper accepts.</p>
              <div className="mt-4">
                <TaskActions task={tasks[0]} isDialog={true} />
              </div>
          </div>
      )
  }

  if (tasks.length === 0) {
    return (
        <Card>
            <CardContent className="h-48 flex flex-col items-center justify-center text-center gap-4">
                <ClipboardList className="w-12 h-12 text-muted-foreground" />
                <div className="space-y-1">
                    <p className="font-semibold">No active tasks</p>
                    <p className="text-muted-foreground text-sm">You haven't posted any tasks yet. Get started by posting a new task!</p>
                </div>
                 <Button asChild>
                    <Link href="/requester/tasks/new">Post a Task</Link>
                </Button>
            </CardContent>
        </Card>
    )
  }

  if (isMobile) {
      return (
        <div className="grid gap-4">
            {tasks.map(task => (
                <Card key={task.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                             <Badge variant={getStatusVariant(task.status)} className="text-xs whitespace-nowrap">{task.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                             <p className="text-sm font-medium mb-1">Helper</p>
                             <HelperInfo helperId={task.helperId || ''}/>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <CircleDollarSign className="w-4 h-4"/>
                                <span>₹{task.price}</span>
                             </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="w-4 h-4"/>
                                <span>{task.createdAt.toLocaleDateString()}</span>
                             </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 p-2 sm:p-4">
                        <TaskActions task={task} />
                    </CardFooter>
                </Card>
            ))}
        </div>
      )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
        <CardDescription>
          A list of all the tasks you have posted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Helper</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                   <TableCell>
                    <HelperInfo helperId={task.helperId || ''}/>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{task.price}</TableCell>
                  <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <TaskActions task={task} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    
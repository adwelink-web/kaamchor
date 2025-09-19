'use client';

import { useState } from 'react';
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
import { WandSparkles, Bot, User, Check, X, Star, MessageSquare, CircleDollarSign, CalendarDays } from 'lucide-react';
import { mockHelpers, getCurrentUser } from '@/lib/data';
import { getSuggestedMatches } from '@/app/actions';
import type { SuggestTaskMatchesOutput } from '@/ai/flows/suggest-task-matches';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

type MyTasksClientProps = {
  tasks: Task[];
};

type MatcherDialogProps = {
  task: Task;
};

function MatcherDialog({ task }: MatcherDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestTaskMatchesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentUser = getCurrentUser();

  const handleFindMatches = async () => {
    setLoading(true);
    setError(null);
    setSuggestions(null);

    const taskDetails = `Category: ${task.category}, Description: ${task.description}, Price: $${task.price}`;

    const result = await getSuggestedMatches({
      taskDetails,
      requesterLocation: currentUser.location,
      availableHelpers: mockHelpers.map(h => ({
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
      return mockHelpers.find(h => h.id === id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={() => handleFindMatches()}>
          <WandSparkles className="mr-2 h-4 w-4" />
          Find Matches
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Helper Suggestions</DialogTitle>
          <DialogDescription>
            Our AI has analyzed your task and found the best helpers for the job.
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
    const helper = mockHelpers.find(h => h.id === helperId);
    if (!helper) return <span className="text-muted-foreground">N/A</span>;
    
    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src={helper.avatarUrl} alt={helper.name} />
                <AvatarFallback>{helper.name[0]}</AvatarFallback>
            </Avatar>
            <span className="truncate">{helper.name}</span>
        </div>
    )
}

function TaskActions({ task }: { task: Task }) {
    const commonButtonClass = "w-full md:w-auto";
    switch(task.status) {
        case 'Posted':
            return (
                <div className="flex flex-col md:flex-row gap-2">
                    <MatcherDialog task={task} />
                    <Button size="sm" variant="destructive-outline" className={commonButtonClass}>Cancel</Button>
                </div>
            );
        case 'Accepted':
        case 'In Progress':
             return <Button size="sm" variant="outline" className={commonButtonClass}>
                <MessageSquare className="mr-2 h-4 w-4"/>
                Contact Helper
             </Button>;
        case 'Completed':
            return <Button size="sm" className={commonButtonClass}>
                <Star className="mr-2 h-4 w-4"/>
                Rate Helper
            </Button>;
        default:
            return null;
    }
}


export default function MyTasksClient({ tasks }: MyTasksClientProps) {
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

  if (tasks.length === 0) {
    return (
        <Card>
            <CardContent className="h-48 flex items-center justify-center">
                <p className="text-muted-foreground">You haven&apos;t posted any tasks yet.</p>
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
                             {task.helperId ? <HelperInfo helperId={task.helperId}/> : <span className="text-muted-foreground text-sm">-</span>}
                        </div>
                        <div className="flex justify-between items-center text-sm">
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <CircleDollarSign className="w-4 h-4"/>
                                <span>${task.price}</span>
                             </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="w-4 h-4"/>
                                <span>{task.createdAt.toLocaleDateString()}</span>
                             </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 p-4">
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
                    {task.helperId ? <HelperInfo helperId={task.helperId}/> : <span className="text-muted-foreground">-</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${task.price}</TableCell>
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

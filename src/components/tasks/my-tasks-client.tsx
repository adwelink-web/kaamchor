'use client';

import { useState } from 'react';
import type { Task, Helper } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
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
import { WandSparkles, Bot, User, Check, X } from 'lucide-react';
import { mockHelpers, getCurrentUser } from '@/lib/data';
import { getSuggestedMatches } from '@/app/actions';
import type { SuggestTaskMatchesOutput } from '@/ai/flows/suggest-task-matches';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';

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
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
               <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
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


export default function MyTasksClient({ tasks }: MyTasksClientProps) {
  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'Accepted':
        return 'secondary';
      case 'Completed':
        return 'default';
      case 'Posted':
      default:
        return 'outline';
    }
  };

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
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${task.price}</TableCell>
                  <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    {task.status === 'Posted' && <MatcherDialog task={task} />}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  You haven&apos;t posted any tasks yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

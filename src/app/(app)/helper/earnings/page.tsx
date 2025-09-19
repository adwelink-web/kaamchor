'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getTasks } from '@/lib/data';
import { CircleDollarSign, CalendarDays } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/auth-context';
import { useState, useEffect } from 'react';
import type { Task } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function EarningsPage() {
    const { user, loading: authLoading } = useAuth();
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const helperId = 'helper-1';

    useEffect(() => {
        if (user) {
            getTasks().then(allTasks => {
                 const myCompletedTasks = allTasks.filter(task => task.helperId === helperId && task.status === 'Completed');
                 setCompletedTasks(myCompletedTasks);
                 setLoading(false);
            })
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const totalEarnings = completedTasks.reduce((acc, task) => acc + task.price, 0);
    const isMobile = useIsMobile();

    const EarningsTable = () => (
         <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {completedTasks.length > 0 ? completedTasks.map(task => (
                    <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">₹{task.price.toFixed(2)}</TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">You have not completed any tasks yet.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )

    const EarningsCards = () => (
        <div className="grid gap-4">
            {completedTasks.length > 0 ? completedTasks.map(task => (
                 <Card key={task.id}>
                    <CardHeader>
                        <CardTitle className="text-base">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarDays className="w-4 h-4"/>
                            <span>{task.createdAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold">
                            <CircleDollarSign className="w-4 h-4 text-primary"/>
                            <span>₹{task.price.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                 <div className="text-center py-12 text-muted-foreground">
                    You have not completed any tasks yet.
                </div>
            )}
        </div>
    )

    if (loading || authLoading) {
        return (
             <div className="grid flex-1 items-start gap-6">
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">My Earnings</h1>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <Skeleton className="h-36" />
                    <Skeleton className="h-36" />
                </div>
                <Skeleton className="h-64" />
            </div>
        )
    }

    return (
        <div className="grid flex-1 items-start gap-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">My Earnings</h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Total Earnings</CardTitle>
                        <CardDescription>This is your total earnings from completed tasks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">₹{totalEarnings.toFixed(2)}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Tasks Completed</CardTitle>
                        <CardDescription>The number of tasks you have successfully completed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{completedTasks.length}</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Earnings History</CardTitle>
                    <CardDescription>A list of your completed tasks and the earnings from each.</CardDescription>
                </CardHeader>
                <CardContent>
                   {isMobile ? <EarningsCards /> : <EarningsTable />}
                </CardContent>
            </Card>
        </div>
    )
}

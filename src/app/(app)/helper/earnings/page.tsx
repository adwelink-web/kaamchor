'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockTasks } from '@/lib/data';
import { CircleDollarSign, CalendarDays } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';


export default function EarningsPage() {
    const helperId = 'helper-1'; // Placeholder
    const completedTasks = mockTasks.filter(task => task.helperId === helperId && task.status === 'Completed');
    const totalEarnings = completedTasks.reduce((acc, task) => acc + task.price, 0);
    const isMobile = useIsMobile();

    const EarningsTable = () => (
         <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Date Completed</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {completedTasks.length > 0 ? completedTasks.map(task => (
                    <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">${task.price.toFixed(2)}</TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">You have no completed tasks.</TableCell>
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
                            <span>${task.price.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                 <div className="text-center py-12 text-muted-foreground">
                    You have no completed tasks.
                </div>
            )}
        </div>
    )

    return (
        <div className="grid flex-1 items-start gap-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">My Earnings</h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Total Earnings</CardTitle>
                        <CardDescription>This is the total amount you've earned from completed tasks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">${totalEarnings.toFixed(2)}</p>
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
                    <CardDescription>A list of your completed tasks and the amount you earned for each.</CardDescription>
                </CardHeader>
                <CardContent>
                   {isMobile ? <EarningsCards /> : <EarningsTable />}
                </CardContent>
            </Card>
        </div>
    )
}

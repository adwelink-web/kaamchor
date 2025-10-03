'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CircleDollarSign, CalendarDays } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Task } from '@/lib/types';

export default function EarningsClient({ completedTasks }: { completedTasks: Task[]}) {
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

    return isMobile ? <EarningsCards /> : <EarningsTable />;
}

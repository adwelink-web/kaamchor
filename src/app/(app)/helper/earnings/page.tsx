

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getTasks, getUser } from '@/lib/data';
import { CircleDollarSign, CalendarDays } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import EarningsClient from './earnings-client';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';


async function EarningsData() {
    const user = auth.currentUser;
    if (!user) {
        redirect('/login');
    }
    const dbUser = await getUser(user.uid);
    if (!dbUser) {
        redirect('/login');
    }

    const allTasks = await getTasks();
    const completedTasks = allTasks.filter(task => task.helperId === dbUser.id && task.status === 'Completed');
    const totalEarnings = completedTasks.reduce((acc, task) => acc + task.price, 0);

    return (
        <>
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
                   <EarningsClient completedTasks={completedTasks} />
                </CardContent>
            </Card>
        </>
    )
}

function EarningsSkeleton() {
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

export default function EarningsPage() {
    return (
        <div className="grid flex-1 items-start gap-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">My Earnings</h1>
            </div>
            <Suspense fallback={<EarningsSkeleton />}>
                <EarningsData />
            </Suspense>
        </div>
    )
}

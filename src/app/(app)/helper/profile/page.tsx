
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, CheckCircle, MapPin, ClipboardList, Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { getTasks } from '@/lib/data';
import type { Task } from '@/lib/types';


export default function HelperProfilePage() {
    const { user, dbUser, loading } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState(true);


    useEffect(() => {
        if (dbUser?.id) {
            getTasks().then(allTasks => {
                const myTasks = allTasks.filter(task => task.helperId === dbUser.id);
                setTasks(myTasks);
                setTasksLoading(false);
            })
        } else if (!loading) {
            setTasksLoading(false);
        }
    }, [dbUser, loading])


    if (loading || !dbUser) {
         return (
             <div className="grid flex-1 items-start gap-6">
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">My Profile</h1>
                </div>
                <Card>
                    <CardHeader className="items-center text-center">
                         <Skeleton className="w-24 h-24 mb-4 rounded-full" />
                         <Skeleton className="h-8 w-48" />
                         <Skeleton className="h-4 w-32 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                             <Skeleton className="h-24 w-full" />
                             <Skeleton className="h-24 w-full" />
                             <Skeleton className="h-24 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    const getInitials = (name: string) => {
        return name
        .split(' ')
        .map((n) => n[0])
        .join('');
    };

    const completedTasks = tasks.filter(t => t.status === 'Completed');
    const totalEarnings = completedTasks.reduce((acc, task) => acc + task.price, 0);


    return (
        <div className="grid flex-1 items-start gap-6">
             <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">My Profile</h1>
            </div>
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                        <AvatarImage src={dbUser.avatarUrl} alt={dbUser.name} />
                        <AvatarFallback>{getInitials(dbUser.name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl">{dbUser.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <MapPin className="w-4 h-4"/>
                        {dbUser.location}
                    </CardDescription>
                     <Badge variant="secondary" className="mt-2">Helper</Badge>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                             <p className="text-2xl font-bold">₹{totalEarnings.toFixed(2)}</p>
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <Wallet className="w-4 h-4 mr-1"/>
                                Total Earnings
                            </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{completedTasks.length}</p>
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                                 <ClipboardList className="w-4 h-4 mr-1"/>
                                Tasks Completed
                            </div>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                             <div className="flex items-center justify-center gap-2">
                                <p className="text-xl font-bold">Verified</p>
                                <CheckCircle className="w-5 h-5 text-green-500"/>
                             </div>
                            <p className="text-sm text-muted-foreground">Account Status</p>
                        </div>
                    </div>
                    {/* <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-lg">My Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {helper.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-base px-3 py-1">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                     <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-lg">Past Work Summary</h3>
                        <p className="text-muted-foreground">{helper.pastWork}</p>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    )
}

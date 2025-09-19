'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTasksByRequester } from '@/lib/data';
import type { Task } from '@/lib/types';
import { CheckCircle, MapPin, ClipboardList, Star } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getTasksByRequester(user.uid).then(userTasks => {
                setTasks(userTasks);
                setTasksLoading(false);
            })
        }
    }, [user]);

    if (loading || !user) {
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

    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const activeTasks = tasks.length - completedTasks;

    const getInitials = (name: string) => {
        return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    };

    return (
        <div className="grid flex-1 items-start gap-6">
             <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">My Profile</h1>
            </div>
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                        <AvatarFallback>{user.displayName ? getInitials(user.displayName) : 'U'}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl">{user.displayName}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <MapPin className="w-4 h-4"/>
                        San Francisco, CA {/* Placeholder Location */}
                    </CardDescription>
                     <Badge variant="secondary" className="mt-2">Requester</Badge>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{tasksLoading ? <Skeleton className="h-8 w-1/4 mx-auto" /> : tasks.length}</p>
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <ClipboardList className="w-4 h-4 mr-1"/>
                                Total Tasks Posted
                            </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{tasksLoading ? <Skeleton className="h-8 w-1/4 mx-auto" /> : completedTasks}</p>
                             <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 mr-1"/>
                                Tasks Completed
                            </div>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{tasksLoading ? <Skeleton className="h-8 w-1/4 mx-auto" /> : activeTasks}</p>
                             <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <Star className="w-4 h-4 mr-1"/>
                                Active Tasks
                            </div>
                        </div>
                    </div>
                     <div className="mt-6 text-center">
                        <h3 className="font-semibold mb-3 text-lg">Account Details</h3>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

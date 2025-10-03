

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTasksByRequester } from '@/lib/data';
import { CheckCircle, MapPin, ClipboardList, Star } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function ProfileData() {
    const user = auth.currentUser;
    if (!user) {
        redirect('/login');
    }

    const tasks = await getTasksByRequester(user.uid);

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
        <Card>
            <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName ? getInitials(user.displayName) : 'U'}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">{user.displayName}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4"/>
                    Mumbai, MH {/* Placeholder Location */}
                </CardDescription>
                    <Badge variant="secondary" className="mt-2">Requester</Badge>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{tasks.length}</div>
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                            <ClipboardList className="w-4 h-4 mr-1"/>
                            Total Tasks Posted
                        </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{completedTasks}</div>
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 mr-1"/>
                            Tasks Completed
                        </div>
                    </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{activeTasks}</div>
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
    );
}

function ProfileSkeleton() {
    return (
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
    );
}

export default function ProfilePage() {
    return (
        <div className="grid flex-1 items-start gap-6">
             <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">My Profile</h1>
            </div>
            <Suspense fallback={<ProfileSkeleton />}>
                <ProfileData />
            </Suspense>
        </div>
    )
}

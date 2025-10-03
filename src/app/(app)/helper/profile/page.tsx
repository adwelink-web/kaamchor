

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, CheckCircle, MapPin, ClipboardList, Wallet } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getTasks, getUser } from '@/lib/data';
import { auth } from '@/lib/firebase';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';


async function ProfileData() {
    const user = auth.currentUser;
    if (!user) {
        redirect('/login');
    }
    const dbUser = await getUser(user.uid);
     if (!dbUser) {
        redirect('/login');
    }

    const allTasks = await getTasks();
    const myTasks = allTasks.filter(task => task.helperId === dbUser.id);
    
    const getInitials = (name: string) => {
        return name
        .split(' ')
        .map((n) => n[0])
        .join('');
    };

    const completedTasks = myTasks.filter(t => t.status === 'Completed');
    const totalEarnings = completedTasks.reduce((acc, task) => acc + task.price, 0);


    return (
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
            </CardContent>
        </Card>
    )
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
    )
}

export default function HelperProfilePage() {
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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser, mockTasks } from '@/lib/data';
import { CheckCircle, MapPin, ClipboardList, Star } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const user = getCurrentUser();
    const userTasks = mockTasks.filter(t => t.requesterId === user.id);
    const completedTasks = userTasks.filter(t => t.status === 'Completed').length;
    const activeTasks = userTasks.length - completedTasks;

    const getInitials = (name: string) => {
        return name
        .split(' ')
        .map((n) => n[0])
        .join('');
    };

    return (
        <div className="grid flex-1 items-start gap-6">
             <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">My Profile</h1>
            </div>
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl">{user.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <MapPin className="w-4 h-4"/>
                        {user.location}
                    </CardDescription>
                     <Badge variant="secondary" className="mt-2">Requester</Badge>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{userTasks.length}</p>
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <ClipboardList className="w-4 h-4 mr-1"/>
                                Total Tasks Posted
                            </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{completedTasks}</p>
                             <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 mr-1"/>
                                Tasks Completed
                            </div>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{activeTasks}</p>
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

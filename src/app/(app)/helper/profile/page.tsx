import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockHelpers } from '@/lib/data';
import { Star, CheckCircle, MapPin } from 'lucide-react';

export default function ProfilePage() {
    // Using a placeholder helper. In a real app, you'd get the current authenticated user.
    const helper = mockHelpers.find(h => h.id === 'helper-1');

    if (!helper) {
        return <div>Helper nahi mila.</div>
    }
    
    const getInitials = (name: string) => {
        return name
        .split(' ')
        .map((n) => n[0])
        .join('');
    };

    return (
        <div className="grid flex-1 items-start gap-6">
             <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Meri Profile</h1>
            </div>
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                        <AvatarImage src={helper.avatarUrl} alt={helper.name} />
                        <AvatarFallback>{getInitials(helper.name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl">{helper.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <MapPin className="w-4 h-4"/>
                        {helper.location}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">{helper.rating}</p>
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                                <Star className="w-4 h-4 mr-1 text-primary fill-primary"/>
                                Average Rating
                            </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-sm text-muted-foreground">Kaam Poore Kiye</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                             <div className="flex items-center justify-center gap-2">
                                <p className="text-xl font-bold">Verified</p>
                                <CheckCircle className="w-5 h-5 text-green-500"/>
                             </div>
                            <p className="text-sm text-muted-foreground">Account Status</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-lg">Meri Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {helper.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-base px-3 py-1">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                     <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-lg">Pichle Kaam Ka Summary</h3>
                        <p className="text-muted-foreground">{helper.pastWork}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

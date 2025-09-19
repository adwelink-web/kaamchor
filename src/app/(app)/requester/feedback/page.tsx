'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTasksByRequester } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import type React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';
import type { Task } from '@/lib/types';

export default function FeedbackPage() {
    const { user } = useAuth();
    const [userTasks, setUserTasks] = useState<Task[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            getTasksByRequester(user.uid).then(setUserTasks);
        }
    }, [user])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Feedback Bhej Diya Gaya!",
            description: "Aapke input ke liye dhanyavaad. Hum jald hi aapse sampark karenge.",
        });
        (e.target as HTMLFormElement).reset();
    }

    return (
        <div className="grid flex-1 items-start gap-4">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Feedback Ya Shikayat Darj Karein</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Feedback & Shikayat Form</CardTitle>
                    <CardDescription>Hum aapke input ko mahatva dete hain. Is form ka upyog karke feedback, shikayat, ya koi sawaal poochein.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <div className="grid gap-3">
                            <Label htmlFor="task">Related Kaam (Optional)</Label>
                            <Select name="task">
                                <SelectTrigger id="task">
                                    <SelectValue placeholder="Ek kaam chunein..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {userTasks.map(task => (
                                        <SelectItem key={task.id} value={task.id}>
                                            {task.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="subject">Vishay</Label>
                            <Input id="subject" name="subject" placeholder="e.g., Ek kaam ke baare mein shikayat" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message">Sandesh</Label>
                            <Textarea id="message" name="message" placeholder="Kripya apni samasya ya feedback detail mein batayein..." className="min-h-48" required />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Submit Karein</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTasks } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import type React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useState, useEffect } from 'react';
import type { Task } from '@/lib/types';


export default function HelperFeedbackPage() {
    const { user } = useAuth();
    const [helperTasks, setHelperTasks] = useState<Task[]>([]);
    const { toast } = useToast();
    
    const helperId = 'helper-1';

    useEffect(() => {
        if (user) {
             getTasks().then(allTasks => {
                 const myTasks = allTasks.filter(task => task.helperId === helperId);
                 setHelperTasks(myTasks);
             });
        }
    }, [user])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Support Form Submit Ho Gaya!",
            description: "Dhanyavaad. Humari support team aapke request ko review karegi.",
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
                    <CardTitle>Support Form</CardTitle>
                    <CardDescription>Kisi kaam ya requester se koi samasya hai? Is form ka upyog karke shikayat darj karein ya feedback dein.</CardDescription>
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
                                    {helperTasks.map(task => (
                                        <SelectItem key={task.id} value={task.id}>
                                            {task.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="subject">Vishay</Label>
                            <Input id="subject" name="subject" placeholder="e.g., Requester ke baare mein shikayat" required/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message">Sandesh</Label>
                            <Textarea id="message" name="message" placeholder="Kripya apni samasya detail mein batayein..." className="min-h-48" required/>
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

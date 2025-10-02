

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
    const { user, dbUser } = useAuth();
    const [helperTasks, setHelperTasks] = useState<Task[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (dbUser) {
             getTasks().then(allTasks => {
                 const myTasks = allTasks.filter(task => task.helperId === dbUser.id);
                 setHelperTasks(myTasks);
             });
        }
    }, [dbUser])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Support Form Submitted!",
            description: "Thank you. Our support team will review your request.",
        });
        (e.target as HTMLFormElement).reset();
    }

    return (
        <div className="grid flex-1 items-start gap-4">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Submit Feedback or Complaint</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Support Form</CardTitle>
                    <CardDescription>Having an issue with a task or requester? Use this form to file a complaint or provide feedback.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <div className="grid gap-3">
                            <Label htmlFor="task">Related Task (Optional)</Label>
                            <Select name="task">
                                <SelectTrigger id="task">
                                    <SelectValue placeholder="Select a task..." />
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
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" placeholder="e.g., Complaint about a requester" required/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Please describe your issue in detail..." className="min-h-48" required/>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

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
            title: "Feedback Sent!",
            description: "Thanks for your input. We'll get back to you shortly.",
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
                    <CardTitle>Feedback & Complaint Form</CardTitle>
                    <CardDescription>We value your input. Use this form to provide feedback, file a complaint, or ask a question.</CardDescription>
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
                                    {userTasks.map(task => (
                                        <SelectItem key={task.id} value={task.id}>
                                            {task.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" placeholder="e.g., Complaint about a task" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Please describe your issue or feedback in detail..." className="min-h-48" required />
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

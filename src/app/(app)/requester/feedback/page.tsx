import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCurrentUser, mockTasks } from '@/lib/data';

export default function FeedbackPage() {
    const currentUser = getCurrentUser();
    const userTasks = mockTasks.filter(task => task.requesterId === currentUser.id);

    return (
        <div className="grid flex-1 items-start gap-4">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Submit Feedback or Complaint</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Feedback Form</CardTitle>
                    <CardDescription>We value your feedback. Please let us know if you have any questions, concerns, or suggestions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
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
                            <Input id="subject" name="subject" placeholder="e.g., Issue with a completed task" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Please describe your issue or feedback in detail..." className="min-h-48"/>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Submit Feedback</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockTasks } from '@/lib/data';

export default function HelperFeedbackPage() {
    const helperId = 'helper-1'; // Placeholder
    const helperTasks = mockTasks.filter(task => task.helperId === helperId);

    return (
        <div className="grid flex-1 items-start gap-4">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Submit Feedback or Complaint</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Support Form</CardTitle>
                    <CardDescription>Have an issue with a task or a requester? Use this form to submit a complaint or provide feedback.</CardDescription>
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
                            <Input id="subject" name="subject" placeholder="e.g., Complaint about a requester" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Please describe your issue in detail..." className="min-h-48"/>
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

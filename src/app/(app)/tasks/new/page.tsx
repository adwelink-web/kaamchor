import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import NewTaskForm from '@/components/tasks/new-task-form';

export default function NewTaskPage() {
  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Post a New Task</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>
            Fill out the form below to post a new task for helpers to find.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewTaskForm />
        </CardContent>
      </Card>
    </div>
  );
}

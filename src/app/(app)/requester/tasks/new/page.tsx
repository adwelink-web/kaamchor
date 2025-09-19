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
        <h1 className="font-semibold text-lg md:text-2xl">Naya Kaam Post Karein</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Kaam Ki Details</CardTitle>
          <CardDescription>
            Neeche diye gaye form ko bharein aur naya kaam post karein jisse helpers dhoond sakein.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewTaskForm />
        </CardContent>
      </Card>
    </div>
  );
}

import AcceptedTasksClient from '@/components/tasks/accepted-tasks-client';
import { getCurrentUser, mockTasks } from '@/lib/data';

export default function AcceptedTasksPage() {
  const currentUser = getCurrentUser();
  // In a real app, this would be the helper's ID
  const helperId = 'helper-1'; // Placeholder ID
  const acceptedTasks = mockTasks.filter((task) => task.helperId === helperId && task.status !== 'Completed');

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">My Accepted Tasks</h1>
      </div>
      <AcceptedTasksClient tasks={acceptedTasks} />
    </div>
  );
}

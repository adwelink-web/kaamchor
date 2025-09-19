import MyTasksClient from '@/components/tasks/my-tasks-client';
import { getCurrentUser, mockTasks } from '@/lib/data';

export default function TaskHistoryPage() {
  const currentUser = getCurrentUser();
  const myCompletedTasks = mockTasks.filter(
    (task) => task.requesterId === currentUser.id && task.status === 'Completed'
  );

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">My Task History</h1>
      </div>
      <MyTasksClient tasks={myCompletedTasks} />
    </div>
  );
}

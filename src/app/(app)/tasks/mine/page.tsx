import MyTasksClient from '@/components/tasks/my-tasks-client';
import { getCurrentUser, mockTasks } from '@/lib/data';

export default function MyTasksPage() {
  const currentUser = getCurrentUser();
  const myTasks = mockTasks.filter((task) => task.requesterId === currentUser.id);

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">My Posted Tasks</h1>
      </div>
      <MyTasksClient tasks={myTasks} />
    </div>
  );
}

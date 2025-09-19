import { mockTasks, mockHelpers } from '@/lib/data';
import TaskCard from '@/components/tasks/task-card';

export default function HelperDashboardPage() {
  // In a real app, you would get the currently logged-in helper
  const currentHelper = mockHelpers.find(h => h.id === 'helper-1');

  // Filter tasks that are "Posted" and match the helper's location
  const availableTasks = mockTasks.filter(task => 
    task.status === 'Posted' && task.location === currentHelper?.location
  );
  
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Find Work</h1>
        <p className="text-muted-foreground ml-4 hidden sm:block">Browse tasks available in your area.</p>
      </div>
      
      {availableTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availableTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
              ))}
          </div>
      ) : (
          <div className="text-center py-12 text-muted-foreground">
              No available tasks found in your location.
          </div>
      )}
    </div>
  );
}

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { TASK_CATEGORIES } from '@/lib/constants';
import { mockTasks, mockHelpers } from '@/lib/data';
import TaskCard from '@/components/tasks/task-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function HelperDashboardPage() {
  // In a real app, you would get the currently logged-in helper
  const currentHelper = mockHelpers.find(h => h.id === 'helper-1');

  // Filter tasks that are "Posted" and match the helper's location
  const availableTasks = mockTasks.filter(task => 
    task.status === 'Posted' && task.location === currentHelper?.location
  );
  
  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Find Work</h1>
        <p className="text-muted-foreground ml-4">Browse tasks available in your area.</p>
      </div>
      <Tabs defaultValue="all">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex">
            <TabsTrigger value="all">All</TabsTrigger>
            {TASK_CATEGORIES.map((cat) => (
              <TabsTrigger value={cat.value} key={cat.value}>
                <cat.icon className="h-4 w-4 mr-2" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        <TabsContent value="all">
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
        </TabsContent>

        {TASK_CATEGORIES.map((cat) => {
            const categoryTasks = availableTasks.filter((task) => task.category === cat.value);
            return (
                <TabsContent value={cat.value} key={cat.value}>
                    {categoryTasks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {categoryTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            No tasks found in this category in your location.
                        </div>
                    )}
                </TabsContent>
            );
        })}
      </Tabs>
    </div>
  );
}

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { TASK_CATEGORIES } from '@/lib/constants';
import { mockTasks } from '@/lib/data';
import TaskCard from '@/components/tasks/task-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function HelperDashboardPage() {
  const availableTasks = mockTasks.filter(task => task.status === 'Posted');
  
  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Find Work</h1>
      </div>
       <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for tasks..."
            className="pl-10 w-full"
          />
        </div>
      <Tabs defaultValue="all">
        <ScrollArea className="w-full whitespace-nowrap">
            <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {TASK_CATEGORIES.map((cat) => (
                <TabsTrigger value={cat.value} key={cat.value}>
                <cat.icon className="h-4 w-4 mr-2" />
                {cat.label}
                </TabsTrigger>
            ))}
            </TabsList>
        </ScrollArea>
        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        {TASK_CATEGORIES.map((cat) => (
          <TabsContent value={cat.value} key={cat.value}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availableTasks
                .filter((task) => task.category === cat.value)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
             {availableTasks.filter(task => task.category === cat.value).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No tasks found in this category.
                </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

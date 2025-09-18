import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { TASK_CATEGORIES } from '@/lib/constants';
import { mockTasks } from '@/lib/data';
import TaskCard from '@/components/tasks/task-card';

export default function DashboardPage() {
  const availableTasks = mockTasks.filter(task => task.status === 'Posted');
  
  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Available Tasks</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild>
            <Link href="/tasks/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Post a Task
            </Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {TASK_CATEGORIES.map((cat) => (
            <TabsTrigger value={cat.value} key={cat.value}>
              <cat.icon className="h-4 w-4 mr-2" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {availableTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
        {TASK_CATEGORIES.map((cat) => (
          <TabsContent value={cat.value} key={cat.value}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

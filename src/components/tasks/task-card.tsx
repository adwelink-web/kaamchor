import type { Task } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, MapPin } from 'lucide-react';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'Accepted':
        return 'secondary';
      case 'Completed':
        return 'default';
      case 'Posted':
      default:
        return 'outline';
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">{task.title}</CardTitle>
          <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
        </div>
        <CardDescription className="line-clamp-2 pt-1">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4" />
            <span>${task.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{task.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}

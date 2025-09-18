'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createTask } from '@/app/actions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { TASK_CATEGORIES } from '@/lib/constants';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Creating...' : 'Create Task'}</Button>;
}

export default function NewTaskForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors && Object.keys(state.errors).length === 0) {
        toast({
            title: "Success!",
            description: state.message,
        })
    } else if (state.message && state.errors && Object.keys(state.errors).length > 0) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive"
        })
    }
  }, [state, toast]);

  return (
    <form action={dispatch} className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="e.g., Fix a leaky faucet" />
        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title}</p>}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Provide a detailed description of the task..."
          className="min-h-32"
        />
        {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="grid gap-3">
          <Label htmlFor="category">Category</Label>
           <Select name="category">
                <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    {TASK_CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                            <div className="flex items-center gap-2">
                                <cat.icon className="w-4 h-4" />
                                <span>{cat.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {state.errors?.category && <p className="text-sm text-destructive">{state.errors.category}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="e.g., New York, NY" />
          {state.errors?.location && <p className="text-sm text-destructive">{state.errors.location}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" placeholder="e.g., 50" />
          {state.errors?.price && <p className="text-sm text-destructive">{state.errors.price}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

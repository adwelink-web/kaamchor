'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Posting...' : 'Post Task'}</Button>;
}

export default function NewTaskForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(createTask, initialState);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && Object.keys(state.errors).length === 0) {
        toast({
            title: "Success!",
            description: state.message,
        });
        formRef.current?.reset();
        router.push('/requester/dashboard');

    } else if (state.message && Object.keys(state.errors).length > 0) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive"
        })
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={dispatch} className="grid gap-6">
      <input type="hidden" name="requesterId" value={user?.uid || ''} />
      <input type="hidden" name="requesterEmail" value={user?.email || ''} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g., Need to fix a leaking tap" />
            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title}</p>}
        </div>
         <div className="grid gap-3">
            <Label htmlFor="requesterPhone">Mobile Number (Optional)</Label>
            <Input id="requesterPhone" name="requesterPhone" placeholder="e.g., 9876543210" />
            {state.errors?.requesterPhone && <p className="text-sm text-destructive">{state.errors.requesterPhone}</p>}
        </div>
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the task in detail..."
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
          <Input id="location" name="location" placeholder="e.g., Mumbai, MH" />
          {state.errors?.location && <p className="text-sm text-destructive">{state.errors.location}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="price">Price (₹)</Label>
          <Input id="price" name="price" type="number" placeholder="e.g., 500" />
          {state.errors?.price && <p className="text-sm text-destructive">{state.errors.price}</p>}
        </div>
      </div>
       <div className="grid gap-3">
        <Label htmlFor="photo">Photo of the task (Optional)</Label>
        <Input id="photo" name="photo" type="file" className="h-auto p-0 file:h-10 file:mr-4 file:px-4 file:border-0 file:bg-muted file:text-muted-foreground hover:file:bg-muted/50"/>
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

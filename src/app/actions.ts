'use server';

import { suggestTaskMatches, type SuggestTaskMatchesInput } from '@/ai/flows/suggest-task-matches';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';


const NewTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  requesterId: z.string().min(1, 'Requester ID is missing'),
});

export async function createTask(prevState: any, formData: FormData) {
  const validatedFields = NewTaskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    location: formData.get('location'),
    price: formData.get('price'),
    requesterId: formData.get('requesterId'),
  });

  if (!validatedFields.success) {
    if (validatedFields.error.flatten().fieldErrors.requesterId) {
       return {
         message: 'Error: You must be logged in to create a task.',
         errors: {},
       };
    }
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }
  
  const { requesterId, ...taskData } = validatedFields.data;

  try {
    const tasksCollection = collection(db, 'tasks');
    await addDoc(tasksCollection, {
      ...taskData,
      requesterId: requesterId,
      status: 'Posted',
      createdAt: Timestamp.now(),
    });

    revalidatePath('/requester/dashboard');
    revalidatePath('/helper/dashboard');

    return {
      message: 'Task posted successfully!',
      errors: {},
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
        message: 'Error: Could not post the task to the database.',
        errors: {},
    }
  }
}

export async function deleteTask(taskId: string) {
    if (!taskId) {
        console.error('Error: Task ID is missing');
        return;
    }

    try {
        await deleteDoc(doc(db, "tasks", taskId));
        revalidatePath('/requester/dashboard');
        revalidatePath('/helper/dashboard');
        revalidatePath('/helper/tasks/accepted');
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

export async function updateTaskStatus(taskId: string, status: 'Posted' | 'Accepted' | 'In Progress' | 'Completed') {
    if (!taskId) {
        console.error('Error: Task ID is missing');
        return;
    }
    
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, { status: status });
        
        revalidatePath('/requester/dashboard');
        revalidatePath('/helper/dashboard');
        revalidatePath('/helper/tasks/accepted');
        revalidatePath(`/requester/tasks/${taskId}`);
        revalidatePath(`/tasks/${taskId}`);

    } catch (error) {
        console.error("Error updating task status:", error);
    }
}


export async function getSuggestedMatches(input: SuggestTaskMatchesInput) {
    try {
        const result = await suggestTaskMatches(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error getting suggestions:", error);
        return { success: false, error: "Unable to get AI suggestions." };
    }
}

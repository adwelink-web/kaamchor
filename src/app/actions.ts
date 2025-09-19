'use server';

import { suggestTaskMatches, type SuggestTaskMatchesInput } from '@/ai/flows/suggest-task-matches';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const NewTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
});

export async function createTask(prevState: any, formData: FormData) {
  const validatedFields = NewTaskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    location: formData.get('location'),
    price: formData.get('price'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    return {
        message: 'Error: You must be logged in to create a task.',
        errors: {},
    }
  }

  try {
    const tasksCollection = collection(db, 'tasks');
    await addDoc(tasksCollection, {
      ...validatedFields.data,
      requesterId: currentUser.uid,
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


export async function getSuggestedMatches(input: SuggestTaskMatchesInput) {
    try {
        const result = await suggestTaskMatches(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error getting suggestions:", error);
        return { success: false, error: "Unable to get AI suggestions." };
    }
}

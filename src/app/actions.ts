'use server';

import { suggestTaskMatches, type SuggestTaskMatchesInput } from '@/ai/flows/suggest-task-matches';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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

  // Here you would typically save the data to your database.
  // For this demo, we'll just log it and revalidate the path.
  console.log('New Task Created:', validatedFields.data);

  revalidatePath('/dashboard');
  revalidatePath('/tasks/mine');

  return {
    message: 'Task posted successfully!',
    errors: {},
  };
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

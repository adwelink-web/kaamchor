// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Task matching AI agent.
 *
 * - suggestTaskMatches - A function that suggests task matches between requesters and helpers.
 * - SuggestTaskMatchesInput - The input type for the suggestTaskMatches function.
 * - SuggestTaskMatchesOutput - The return type for the suggestTaskMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskMatchesInputSchema = z.object({
  taskDetails: z
    .string()
    .describe('Details of the task including category, description, location, and price.'),
  requesterLocation: z
    .string()
    .describe('The location of the task requester.'),
  availableHelpers: z
    .array(z.object({
      helperId: z.string(),
      helperLocation: z.string(),
      pastWork: z.string().optional(),
    }))
    .describe('A list of available helpers with their locations and past work.'),
});
export type SuggestTaskMatchesInput = z.infer<typeof SuggestTaskMatchesInputSchema>;

const SuggestTaskMatchesOutputSchema = z.object({
  suggestedMatches: z
    .array(z.object({
      helperId: z.string(),
      reason: z.string(),
    }))
    .describe('A list of suggested helper IDs and the reason for the match.'),
});
export type SuggestTaskMatchesOutput = z.infer<typeof SuggestTaskMatchesOutputSchema>;

export async function suggestTaskMatches(input: SuggestTaskMatchesInput): Promise<SuggestTaskMatchesOutput> {
  return suggestTaskMatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskMatchesPrompt',
  input: {schema: SuggestTaskMatchesInputSchema},
  output: {schema: SuggestTaskMatchesOutputSchema},
  prompt: `You are a task matching expert, skilled at connecting task requesters with the most suitable helpers.

Given the following task details:
{{taskDetails}}

And the task requester location:
{{requesterLocation}}

And a list of available helpers:
{{#each availableHelpers}}
- Helper ID: {{this.helperId}}, Location: {{this.helperLocation}}, Past Work: {{this.pastWork}}
{{/each}}

Suggest the best helper matches, prioritizing by location and past work experience. Provide a reason for each match.

Output in the following JSON format:
{
  "suggestedMatches": [
    {
      "helperId": "helper_id",
      "reason": "reason for the match"
    }
  ]
}`,
});

const suggestTaskMatchesFlow = ai.defineFlow(
  {
    name: 'suggestTaskMatchesFlow',
    inputSchema: SuggestTaskMatchesInputSchema,
    outputSchema: SuggestTaskMatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

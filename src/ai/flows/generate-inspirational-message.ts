'use server';

/**
 * @fileOverview Generates an inspirational message based on a Bible verse.
 *
 * - generateInspirationalMessage - A function that generates an inspirational message.
 * - GenerateInspirationalMessageInput - The input type for the generateInspirationalMessage function.
 * - GenerateInspirationalMessageOutput - The return type for the generateInspirationalMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInspirationalMessageInputSchema = z.object({
  bibleVerse: z
    .string()
    .describe('The daily Bible verse to generate inspiration from.'),
});

export type GenerateInspirationalMessageInput = z.infer<
  typeof GenerateInspirationalMessageInputSchema
>;

const GenerateInspirationalMessageOutputSchema = z.object({
  inspirationalMessage: z
    .string()
    .describe('The AI-generated inspirational message.'),
});

export type GenerateInspirationalMessageOutput = z.infer<
  typeof GenerateInspirationalMessageOutputSchema
>;

export async function generateInspirationalMessage(
  input: GenerateInspirationalMessageInput
): Promise<GenerateInspirationalMessageOutput> {
  return generateInspirationalMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInspirationalMessagePrompt',
  input: {schema: GenerateInspirationalMessageInputSchema},
  output: {schema: GenerateInspirationalMessageOutputSchema},
  prompt: `Given the following Bible verse, generate an inspirational message that provides deeper insights and helps apply the verse to daily life:\n\nBible Verse: {{{bibleVerse}}}\n\nInspirational Message: `,
});

const generateInspirationalMessageFlow = ai.defineFlow(
  {
    name: 'generateInspirationalMessageFlow',
    inputSchema: GenerateInspirationalMessageInputSchema,
    outputSchema: GenerateInspirationalMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

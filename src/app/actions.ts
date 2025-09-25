'use server';

import { generateInspirationalMessage } from '@/ai/flows/generate-inspirational-message';

export async function getInspirationAction(bibleVerse: string) {
  try {
    const result = await generateInspirationalMessage({ bibleVerse });
    if (result && result.inspirationalMessage) {
        return { success: true, message: result.inspirationalMessage };
    }
    throw new Error("Invalid response from AI service.");
  } catch (error) {
    console.error('Error generating inspirational message:', error);
    return { success: false, error: 'Failed to generate inspiration. Please try again later.' };
  }
}

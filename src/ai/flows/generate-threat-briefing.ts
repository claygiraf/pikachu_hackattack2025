// This is an autogenerated file from Firebase Studio.

'use server';

/**
 * @fileOverview Generates a threat briefing from collected cybersecurity data.
 *
 * - generateThreatBriefing - A function that generates a threat briefing.
 * - GenerateThreatBriefingInput - The input type for the generateThreatBriefing function.
 * - GenerateThreatBriefingOutput - The return type for the generateThreatBriefing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThreatBriefingInputSchema = z.object({
  threatData: z
    .string()
    .describe(
      'Aggregated cybersecurity data from various sources, including transactional records, device logs, user activity analytics, and threat intelligence feeds.'
    ),
});
export type GenerateThreatBriefingInput = z.infer<typeof GenerateThreatBriefingInputSchema>;

const GenerateThreatBriefingOutputSchema = z.object({
  briefing: z
    .string()
    .describe(
      'A comprehensive threat briefing summarizing the current threat landscape, potential risks, and recommended mitigation strategies.'
    ),
});
export type GenerateThreatBriefingOutput = z.infer<typeof GenerateThreatBriefingOutputSchema>;

export async function generateThreatBriefing(
  input: GenerateThreatBriefingInput
): Promise<GenerateThreatBriefingOutput> {
  return generateThreatBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateThreatBriefingPrompt',
  input: {schema: GenerateThreatBriefingInputSchema},
  output: {schema: GenerateThreatBriefingOutputSchema},
  prompt: `You are a cybersecurity expert tasked with creating threat briefings for security analysts.

  Based on the provided cybersecurity data, generate a comprehensive threat briefing that includes:
  - A summary of the current threat landscape
  - Identification of potential risks and vulnerabilities
  - Recommended mitigation strategies

  Cybersecurity Data: {{{threatData}}} `,
});

const generateThreatBriefingFlow = ai.defineFlow(
  {
    name: 'generateThreatBriefingFlow',
    inputSchema: GenerateThreatBriefingInputSchema,
    outputSchema: GenerateThreatBriefingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

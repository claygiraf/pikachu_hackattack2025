// Summarize Threat Data
'use server';
/**
 * @fileOverview Summarizes threat data and its risk level.
 *
 * - summarizeThreatData - A function that handles the threat data summarization process.
 * - SummarizeThreatDataInput - The input type for the summarizeThreatData function.
 * - SummarizeThreatDataOutput - The return type for the summarizeThreatData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeThreatDataInputSchema = z.object({
  threatData: z
    .string()
    .describe(
      'A comprehensive set of threat data including logs, anomaly reports, and security alerts.'
    ),
});
export type SummarizeThreatDataInput = z.infer<typeof SummarizeThreatDataInputSchema>;

const SummarizeThreatDataOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the threat data.'),
  riskLevel: z
    .string()
    .describe(
      'The risk level associated with the threat data (e.g., low, medium, high, critical).'
    ),
  recommendations: z
    .string()
    .describe(
      'Recommended actions to mitigate the identified threat, if possible.'
    )
    .optional(),
});
export type SummarizeThreatDataOutput = z.infer<typeof SummarizeThreatDataOutputSchema>;

export async function summarizeThreatData(input: SummarizeThreatDataInput): Promise<SummarizeThreatDataOutput> {
  return summarizeThreatDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeThreatDataPrompt',
  input: {schema: SummarizeThreatDataInputSchema},
  output: {schema: SummarizeThreatDataOutputSchema},
  prompt: `You are a cybersecurity expert. Summarize the following threat data and determine its risk level.
\nThreat Data:\n{{{threatData}}}
\nRespond with a summary, a risk level (low, medium, high, or critical), and recommendations to mitigate the threat.`,
});

const summarizeThreatDataFlow = ai.defineFlow(
  {
    name: 'summarizeThreatDataFlow',
    inputSchema: SummarizeThreatDataInputSchema,
    outputSchema: SummarizeThreatDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

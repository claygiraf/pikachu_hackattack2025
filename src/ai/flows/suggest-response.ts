'use server';

/**
 * @fileOverview Suggests a threat remediation strategy for security operators.
 *
 * - suggestResponse - A function that suggests a response strategy.
 * - SuggestResponseInput - The input type for the suggestResponse function.
 * - SuggestResponseOutput - The return type for the suggestResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResponseInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('A detailed description of the cybersecurity threat detected.'),
  affectedSystems: z
    .string()
    .describe('List of systems affected by the threat, including IP addresses or hostnames.'),
  dataSensitivity: z
    .string()
    .describe('The sensitivity level of the data potentially compromised (e.g., high, medium, low).'),
  regulatoryCompliance: z
    .string()
    .describe('Any regulatory compliance requirements applicable (e.g., GDPR, HIPAA).'),
});
export type SuggestResponseInput = z.infer<typeof SuggestResponseInputSchema>;

const SuggestResponseOutputSchema = z.object({
  suggestedStrategy: z
    .string()
    .describe('A detailed strategy to remediate the identified threat.'),
  estimatedImpact: z
    .string()
    .describe('The estimated impact of the suggested strategy on business operations.'),
  resourceRequirements: z
    .string()
    .describe('The resources (e.g., personnel, software) required to implement the suggested strategy.'),
  communicationPlan: z
    .string()
    .describe('A plan for communicating the incident and remediation steps to stakeholders.'),
});
export type SuggestResponseOutput = z.infer<typeof SuggestResponseOutputSchema>;

export async function suggestResponse(input: SuggestResponseInput): Promise<SuggestResponseOutput> {
  return suggestResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResponsePrompt',
  input: {schema: SuggestResponseInputSchema},
  output: {schema: SuggestResponseOutputSchema},
  prompt: `You are an expert cybersecurity analyst. Given the details of a cybersecurity threat, you will suggest a comprehensive remediation strategy.

Threat Description: {{{threatDescription}}}
Affected Systems: {{{affectedSystems}}}
Data Sensitivity: {{{dataSensitivity}}}
Regulatory Compliance: {{{regulatoryCompliance}}}

Based on the information provided, suggest a strategy to remediate the threat, estimate the impact of the strategy, list the required resources, and create a communication plan.`,
});

const suggestResponseFlow = ai.defineFlow(
  {
    name: 'suggestResponseFlow',
    inputSchema: SuggestResponseInputSchema,
    outputSchema: SuggestResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

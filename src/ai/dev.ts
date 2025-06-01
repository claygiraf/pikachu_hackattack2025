import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-response.ts';
import '@/ai/flows/generate-threat-briefing.ts';
import '@/ai/flows/summarize-threat-data.ts';
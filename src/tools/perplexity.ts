import { config } from '../config/env.js';

export interface PerplexityResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

export async function searchPerplexity(query: string): Promise<string> {
  if (!config.perplexityApiKey) {
    throw new Error('PERPLEXITY_API_KEY is required for research');
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.perplexityApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        {
          role: 'user',
          content: query,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.statusText}`);
  }

  const data = await response.json() as PerplexityResponse;
  return data.choices[0]?.message?.content || 'No results found';
}

import { config } from '../config/env.js';

export interface FirecrawlResponse {
  success: boolean;
  data: {
    content: string;
    markdown: string;
    metadata: Record<string, unknown>;
  };
}

export async function crawlUrl(url: string): Promise<string> {
  if (!config.firecrawlApiKey) {
    throw new Error('FIRECRAWL_API_KEY is required for web crawling');
  }

  const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.firecrawlApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formats: ['markdown'],
    }),
  });

  if (!response.ok) {
    throw new Error(`Firecrawl API error: ${response.statusText}`);
  }

  const data = await response.json() as FirecrawlResponse;
  return data.data?.markdown || data.data?.content || 'No content extracted';
}

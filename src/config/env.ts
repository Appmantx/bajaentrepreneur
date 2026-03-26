import dotenv from 'dotenv';
dotenv.config();

export const config = {
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  perplexityApiKey: process.env.PERPLEXITY_API_KEY || '',
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY || '',
  model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
};

export function validateConfig() {
  if (!config.anthropicApiKey) {
    throw new Error('ANTHROPIC_API_KEY is required');
  }
}

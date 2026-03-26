import { runAgent, AgentConfig } from './base.js';
import { searchPerplexity } from '../tools/perplexity.js';
import { crawlUrl } from '../tools/firecrawl.js';

const researchAgentConfig: AgentConfig = {
  name: 'Research Agent',
  description: 'Researches trending topics using Perplexity and Firecrawl',
  systemPrompt: `You are an expert research assistant for Baja Entrepreneur.
Your job is to:
1. Research trending topics in AI, entrepreneurship, and business
2. Find relevant articles and resources about Baja California / San Diego business
3. Analyze and synthesize information from multiple sources
4. Return structured research findings with citations

Focus on topics relevant to:
- Entrepreneurs in Baja California and San Diego
- Cross-border business opportunities
- Tech and AI trends for small businesses
- Local events and networking opportunities

Always provide sources and key insights.`,
};

export async function research(topic: string): Promise<string> {
  // First, search with Perplexity
  console.log('[Research Agent] Searching with Perplexity...');
  const perplexityResults = await searchPerplexity(topic);

  // Then use Claude to analyze and structure the results
  const result = await runAgent(
    researchAgentConfig,
    `Analyze and structure these research findings about "${topic}":\n\n${perplexityResults}`
  );

  return result.data;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const topic = process.argv[2] || 'AI trends for entrepreneurs in 2025';
  research(topic).then(console.log).catch(console.error);
}

export default researchAgentConfig;

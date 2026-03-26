import { runAgent, AgentConfig } from './base.js';
import { searchPerplexity } from '../tools/perplexity.js';

const eventsAgentConfig: AgentConfig = {
  name: 'Events Agent',
  description: 'Finds local events and creates social media content',
  systemPrompt: `You are an events coordinator and social media specialist for Baja Entrepreneur.
Your job is to:
1. Find upcoming tech, business, and networking events in:
   - San Diego, CA
   - Tijuana, Baja California
   - Ensenada, Baja California
   - Rosarito, Baja California
2. Create engaging social media posts to promote content
3. Develop hashtag strategies for maximum reach
4. Suggest event partnerships and sponsorship opportunities

For each event found, provide:
- Event name
- Date and time
- Location
- Relevance to entrepreneurs
- Link (if available)

For social media posts, create content for:
- LinkedIn (professional)
- Twitter/X (concise, hashtag-heavy)
- Instagram (visual-friendly captions)
- Facebook (community-focused)`,
};

export async function findEvents(topic: string): Promise<string> {
  console.log('[Events Agent] Searching for local events...');

  const searchQuery = `upcoming ${topic} events San Diego Tijuana Baja California 2025`;
  const eventResults = await searchPerplexity(searchQuery);

  const result = await runAgent(
    eventsAgentConfig,
    `Find and organize relevant events from this search:\n\n${eventResults}\n\nAlso create social media posts to promote content about "${topic}".`
  );

  return result.data;
}

export async function createSocialPosts(
  articleSummary: string,
  articleUrl: string = ''
): Promise<string> {
  const result = await runAgent(
    eventsAgentConfig,
    `Create a social media campaign for this article:\n\n${articleSummary}\n\nArticle URL: ${articleUrl || '[to be added]'}\n\nCreate posts for LinkedIn, Twitter/X, Instagram, and Facebook.`
  );

  return result.data;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const topic = process.argv[2] || 'tech entrepreneurship';
  findEvents(topic).then(console.log).catch(console.error);
}

export default eventsAgentConfig;
